import React, { useState, FormEvent } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../pages/api/auth/firebase';
// Sign up form component
const SignUpForm = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Handle form submission for email and password sign up
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Create a new user with email and password using Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the protected page after successful sign up
      window.location.href = '/protected';
    } catch (error) {
      // Set the error message if there's an error
      setError((error as Error).message || 'An unknown error occurred.');
    }
  };
  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google using Firebase Auth
      await signInWithPopup(auth, provider);
      // Redirect to the protected page after successful sign in
      window.location.href = '/protected';
    } catch (error) {
      // Set the error message if there's an error
      setError((error as Error).message || 'An unknown error occurred.');
    }
  };
  // Render the sign up form
  return (
    <form onSubmit={handleSubmit} method="post">
      <h1>Sign Up</h1>
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      <button type="button" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </form>
  );
};

export default SignUpForm;
