import { addDoc, collection, doc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Award points to the current user.
 * - Increments both totalPoints and weeklyPoints in Firestore.
 * - Writes a telemetry event to users/{uid}/telemetry for analytics.
 */
export async function awardPoints(points: number, reason: string = 'challenge') {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const userRef = doc(db, 'users', uid);

  // 1. Update the user's point totals
  await updateDoc(userRef, {
    totalPoints: increment(points),
    weeklyPoints: increment(points),
  });

  // 2. Log telemetry event
  await addDoc(collection(db, 'users', uid, 'telemetry'), {
    event: 'points_awarded',
    points,
    reason,
    timestamp: serverTimestamp(),
  });
}

/** Compute level from total points (every 200 pts = 1 level) */
export function computeLevel(totalPoints: number): number {
  return Math.max(1, Math.floor(totalPoints / 200) + 1);
}
