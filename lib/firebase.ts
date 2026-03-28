import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfp3FBG8RdlVFKspQgXO5ONhXfoDTKjT0",
  authDomain: "recycleapp-39066.firebaseapp.com",
  projectId: "recycleapp-39066",
  storageBucket: "recycleapp-39066.firebasestorage.app",
  messagingSenderId: "246956281826",
  appId: "1:246956281826:web:bf5ac2921e6123effcb3bb",
  measurementId: "G-7C5FWZKYZY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);