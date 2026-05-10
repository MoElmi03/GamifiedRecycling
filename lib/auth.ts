import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string,
  postcode: string,
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, 'users', cred.user.uid), {
    firstName,
    lastName,
    username,
    name:                username, // used by leaderboard / display
    email,
    postcode:            postcode.toUpperCase().trim(),
    photoURL:            '',
    totalPoints:         0,
    weeklyPoints:        0,
    currentStreak:       0,
    lastActivityDate:    '',
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

export async function updateProfile(
  firstName: string,
  lastName: string,
  username: string,
  postcode: string,
) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');
  await updateDoc(doc(db, 'users', user.uid), {
    firstName,
    lastName,
    username,
    name:     username,
    postcode: postcode.toUpperCase().trim(),
  });
}

export async function changeUserEmail(currentPassword: string, newEmail: string) {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('Not logged in');
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updateEmail(user, newEmail);
  await updateDoc(doc(db, 'users', user.uid), { email: newEmail });
}

export async function changeUserPassword(currentPassword: string, newPassword: string) {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('Not logged in');
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
}