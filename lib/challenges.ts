// Unified challenge definitions — IDs match what progress.ts tracks
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { computeLevel } from './progress';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  type: 'daily' | 'weekly';
  metric: 'lessons' | 'quizzes';
  target: number;
}

export const ALL_CHALLENGES: Challenge[] = [
  // Daily
  { id: 'first_lesson',  title: 'First Step',       description: 'Complete your first lesson',   points: 10, icon: '📖', type: 'daily',  metric: 'lessons', target: 1  },
  { id: 'first_quiz',    title: 'Quiz Starter',      description: 'Complete your first quiz',     points: 10, icon: '🎯', type: 'daily',  metric: 'quizzes', target: 1  },
  { id: 'five_lessons',  title: 'Study Session',     description: 'Complete 5 lessons in total',  points: 25, icon: '📚', type: 'daily',  metric: 'lessons', target: 5  },
  // Weekly
  { id: 'five_quizzes',  title: 'Quiz Master',       description: 'Complete 5 quizzes in total',  points: 50, icon: '🏆', type: 'weekly', metric: 'quizzes', target: 5  },
  { id: 'ten_lessons',   title: 'Knowledge Seeker',  description: 'Complete 10 lessons in total', points: 75, icon: '🌟', type: 'weekly', metric: 'lessons', target: 10 },
  { id: 'ten_quizzes',   title: 'Quiz Champion',     description: 'Complete 10 quizzes in total', points: 75, icon: '🥇', type: 'weekly', metric: 'quizzes', target: 10 },
];

export async function completeChallenge(
  challenge: Challenge,
  completedIds: string[],
): Promise<boolean> {
  if (completedIds.includes(challenge.id)) return false;
  const uid = auth.currentUser?.uid;
  if (!uid) return false;

  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    completedChallenges: arrayUnion(challenge.id),
    level: computeLevel(0), // will be refreshed by real-time listener
  });
  return true;
}