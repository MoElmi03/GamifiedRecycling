import { addDoc, collection, doc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export async function awardPoints(points: number, reason: string = 'challenge') {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    totalPoints: increment(points),
    weeklyPoints: increment(points),
  });

  await addDoc(collection(db, 'users', uid, 'telemetry'), {
    event: 'points_awarded',
    points,
    reason,
    timestamp: serverTimestamp(),
  });
}

/*Compute level from total points*/
export function computeLevel(totalPoints: number): number {
  return Math.max(1, Math.floor(totalPoints / 200) + 1);
}
