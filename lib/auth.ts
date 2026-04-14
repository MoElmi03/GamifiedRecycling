import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export async function registerUser(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, 'users', cred.user.uid), {
    name:                email.split('@')[0],
    email,
    photoURL:            '',
    totalPoints:         0,
    weeklyPoints:        0,
    currentStreak:       0,
    level:               1,
    completedChallenges: [],
    completedLessons:    [],
    completedQuizzes:    [],
    quizScores:          {},
    lastWeekReset:       serverTimestamp(),
    joinDate:            serverTimestamp(),
  });

  return cred;
}

export function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
  return signOut(auth);
}