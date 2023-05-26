import SignUpPage from './SignUpPage/SignUpPage';

import { signInWithPopup } from 'firebase/auth';
import { auth } from './api/auth/firebase';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

export default function Home() {
  // Fonction pour gérer la connexion avec Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Connectez-vous avec Google en utilisant Firebase Auth
      await signInWithPopup(auth, provider);
      // Redirigez vers la page protégée après une connexion réussie
      window.location.href = '/protected';
    } catch (error) {
      // Gérez l'erreur de connexion Google
      console.error('Error signing in with Google:', error);
    }
  };

  // Fonction pour gérer la connexion avec Github
  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider();

    try {
      // Connectez-vous avec Github en utilisant Firebase Auth
      await signInWithPopup(auth, provider);
      // Redirigez vers la page protégée après une connexion réussie
      window.location.href = '/protected';
    } catch (error) {
      // Gérez l'erreur de connexion Github
      console.error('Error signing in with Github:', error);
    }
  };

  return (
    <div>
      <SignUpPage
        handleGithubSignIn={handleGithubSignIn}
        handleGoogleSignIn={handleGoogleSignIn}
      />
    </div>
  );
}
