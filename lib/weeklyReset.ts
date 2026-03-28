import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/** Returns the Monday (start of week) for any given date, at midnight UTC */
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getUTCDay(); // 0 = Sunday
  const diff = (day === 0 ? -6 : 1) - day; // shift to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/**
 * Called on app launch (after auth resolves).
 * If the user's lastWeekReset is from a previous week, reset weeklyPoints
 * and completedChallenges, then update lastWeekReset to now.
 */
export async function checkAndRunWeeklyReset(): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();
  const now = new Date();
  const currentWeekStart = getWeekStart(now);

  // lastWeekReset might be a Firestore Timestamp or null
  const lastReset: Date | null = data.lastWeekReset?.toDate?.() ?? null;

  const needsReset = !lastReset || getWeekStart(lastReset) < currentWeekStart;

  if (needsReset) {
    await updateDoc(ref, {
      weeklyPoints: 0,
      completedChallenges: [],
      lastWeekReset: serverTimestamp(),
    });
    console.log('[WeeklyReset] Weekly points and challenges reset for', uid);
  }
}
