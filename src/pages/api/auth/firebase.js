// import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyCuZbEEDHSM-O5me_9IhU93lw55YUpGu4k',
  authDomain: 'moviesocial-c621b.firebaseapp.com',
  projectId: 'moviesocial-c621b',
  storageBucket: 'moviesocial-c621b.appspot.com',
  messagingSenderId: '850915775573',
  appId: '1:850915775573:web:28e1cd50dca53f2913b0dc',
  measurementId: 'G-DZ2P6Y0GYS',
};

// Initialize the Firebase app if it doesn't exist, otherwise use the existing app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Get Firebase Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

// Export the Auth and Firestore instances
export { auth, db };
