import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProgress {
  completedChallenges: string[];   // fixed: was never[]
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  totalPoints: number;
  weeklyPoints: number;
  level: number;
  currentStreak: number;
}

const LESSON_POINTS = 20;
const QUIZ_POINTS   = 30;
const PERFECT_BONUS = 10;

export function computeLevel(pts: number): number {
  return Math.floor(pts / 200) + 1;
}

export async function getUserProgress(): Promise<UserProgress | null> {
  const user = auth.currentUser;
  if (!user) return null;
  const snap = await getDoc(doc(db, 'users', user.uid));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    completedChallenges: d.completedChallenges ?? [],
    completedLessons:    d.completedLessons    ?? [],
    completedQuizzes:    d.completedQuizzes    ?? [],
    quizScores:          d.quizScores          ?? {},
    totalPoints:         d.totalPoints         ?? 0,
    weeklyPoints:        d.weeklyPoints        ?? 0,
    level:               d.level               ?? 1,
    currentStreak:       d.currentStreak       ?? 0,
  };
}

export async function markLessonComplete(lessonId: string): Promise<{ pointsEarned: number; alreadyDone: boolean }> {
  const user = auth.currentUser;
  if (!user) return { pointsEarned: 0, alreadyDone: false };

  const ref  = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  const data = snap.data() ?? {};
  const completed: string[] = data.completedLessons ?? [];

  if (completed.includes(lessonId)) return { pointsEarned: 0, alreadyDone: true };

  const newTotal = (data.totalPoints ?? 0) + LESSON_POINTS;

  await updateDoc(ref, {
    completedLessons: [...completed, lessonId],
    totalPoints:      increment(LESSON_POINTS),
    weeklyPoints:     increment(LESSON_POINTS),
    level:            computeLevel(newTotal),
  });

  await setDoc(doc(db, 'users', user.uid, 'telemetry', `lesson_${lessonId}_${Date.now()}`), {
    type: 'lesson_complete', lessonId, points: LESSON_POINTS, ts: new Date().toISOString(),
  });

  return { pointsEarned: LESSON_POINTS, alreadyDone: false };
}

export async function markQuizComplete(
  quizId: string,
  score: number,
  correct: number,
  total: number,
): Promise<{ pointsEarned: number; alreadyDone: boolean; newBest: boolean }> {
  const user = auth.currentUser;
  if (!user) return { pointsEarned: 0, alreadyDone: false, newBest: false };

  const ref  = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  const data = snap.data() ?? {};

  const completedQuizzes: string[]         = data.completedQuizzes ?? [];
  const quizScores: Record<string, number> = data.quizScores       ?? {};

  const prevBest  = quizScores[quizId] ?? -1;
  const isPerfect = score === 100;
  const isNewBest = score > prevBest;
  const firstTime = !completedQuizzes.includes(quizId);

  let pts = 0;
  if (firstTime) pts += QUIZ_POINTS;
  if (isPerfect && prevBest < 100) pts += PERFECT_BONUS;

  const updates: Record<string, any> = {
    [`quizScores.${quizId}`]: Math.max(score, prevBest < 0 ? 0 : prevBest),
  };

  if (firstTime) {
    updates.completedQuizzes = [...completedQuizzes, quizId];
  }

  if (pts > 0) {
    const newTotal = (data.totalPoints ?? 0) + pts;
    updates.totalPoints  = increment(pts);
    updates.weeklyPoints = increment(pts);
    updates.level        = computeLevel(newTotal);
  }

  await updateDoc(ref, updates);

  await setDoc(doc(db, 'users', user.uid, 'telemetry', `quiz_${quizId}_${Date.now()}`), {
    type: 'quiz_complete', quizId, score, correct, total, points: pts, ts: new Date().toISOString(),
  });

  return { pointsEarned: pts, alreadyDone: !firstTime, newBest: isNewBest };
}

// ── Challenge milestone checker ──────────────────────────────────────────────
export async function checkChallengesAfterProgress(): Promise<string[]> {
  const user = auth.currentUser;
  if (!user) return [];

  const snap    = await getDoc(doc(db, 'users', user.uid));
  const data    = snap.data() ?? {};
  const done    = new Set<string>(data.completedChallenges ?? []);
  const lessons = (data.completedLessons ?? []).length;
  const quizzes = (data.completedQuizzes ?? []).length;

  const nowComplete: string[] = [];
  const hit = (id: string, cond: boolean) => { if (cond && !done.has(id)) nowComplete.push(id); };

  hit('first_lesson',  lessons >= 1);
  hit('five_lessons',  lessons >= 5);
  hit('ten_lessons',   lessons >= 10);
  hit('first_quiz',    quizzes >= 1);
  hit('five_quizzes',  quizzes >= 5);
  hit('ten_quizzes',   quizzes >= 10);

  if (nowComplete.length > 0) {
    await updateDoc(doc(db, 'users', user.uid), {
      completedChallenges: [...done, ...nowComplete],
    });
  }

  return nowComplete;
}

export function chapterLessonsDone(completedLessons: string[], chapterId: string, partCount = 3): boolean {
  for (let i = 1; i <= partCount; i++) {
    if (!completedLessons.includes(`${chapterId}-0${i}`)) return false;
  }
  return true;
}

export function chapterQuizzesDone(completedQuizzes: string[], chapterId: string, partCount = 3): boolean {
  for (let i = 1; i <= partCount; i++) {
    if (!completedQuizzes.includes(`${chapterId}-0${i}`)) return false;
  }
  return true;
}