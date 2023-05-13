import * as React from 'react';
import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Theme from '../Theme/Theme.ts';

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // Connectez-vous avec Google en utilisant Firebase Auth
    await signInWithPopup(auth, provider);
    // Redirigez vers la page protégée après une connexion réussie
    window.location.href = '/protected';
  } catch (error) {
    // Définissez le message d'erreur s'il y a une erreur
    setError((error as Error).message || 'An unknown error occurred.');
  }
};

const handleGithubSignIn = async () => {
  const provider = new GithubAuthProvider();

  try {
    // Connectez-vous avec Github en utilisant Firebase Auth
    await signInWithPopup(auth, provider);
    // Redirigez vers la page protégée après une connexion réussie
    window.location.href = '/protected';
  } catch (error) {
    // Définissez le message d'erreur s'il y a une erreur
    console.log(error);
    setError((error as Error).message || 'Une erreur inconnue est survenue.');
  }
};

function SignInProviders({ handleGithubSignIn, handleGoogleSignIn }) {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AiFillGithub size={'40'} />}
        sx={{
          flexGrow: 1,
          borderRadius: '25px 25px 25px 25px',
          borderColor: Theme.palette.grey[600],
          width: '5rem',
          height: '5rem',
          textTransform: 'none',
          color: Theme.palette.secondary.main,
          mr: '100px',
        }}
        onClick={handleGithubSignIn}
      >
        <span
          style={{
            fontSize: '25px',
            fontWeight: 500,
          }}
        >
          Github
        </span>
      </Button>
      <Button
        variant="outlined"
        startIcon={<FcGoogle size={'40'} />}
        sx={{
          flexGrow: 1,
          borderRadius: '25px 25px 25px 25px',
          borderColor: Theme.palette.grey[600],
          width: '5rem',
          height: '5rem',
          textTransform: 'none',
          color: Theme.palette.secondary.main,
        }}
        onClick={handleGoogleSignIn}
      >
        <span
          style={{
            fontSize: '25px',
            fontWeight: 500,
          }}
        >
          Google
        </span>
      </Button>
    </>
  );
}

export default SignInProviders;
