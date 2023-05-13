import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './SignUpPage.module.css';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import EmailField from './EmailField/EmailField.tsx'; // Importez le composant EmailField ici
import PasswordField from './PasswordField/PasswordField.tsx'; // Importez le composant PasswordField ici
import SignInProviders from './SignInProviders/SignInProviders.tsx'; // Importez le composant PasswordField ici
import Theme from './Theme/Theme.ts'; // Importez le composant PasswordField ici
import zxcvbn from 'zxcvbn';

import { auth } from '../api/auth/firebase';
// Define constants at the top of your file
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z|a-z]{2,}$/i;
const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email.',
  PASSWORD_REQUIRES_CAPITAL:
    'Password must contain at least one uppercase letter.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  EMAIL_IN_USE: 'The email address is already in use by another account.',
};
// Function to calculate password strength using zxcvbn library
function getPasswordStrength(password: string) {
  const result = zxcvbn(password);
  const score = result.score;
  return score;
}

// Map password strength to message and color
const passwordStrengthMessage = {
  0: { message: '', color: 'transparent' },
  1: { message: 'Mot de passe très faible', color: 'red' },
  2: { message: 'Mot de passe faible', color: 'orange' },
  3: { message: 'Mot de passe moyennement sécurisé', color: 'orange' },
  4: { message: 'Mot de passe sécurisé', color: 'green' },
};

// Define the props for SignInSide component
interface SignInSideProps {
  handleGithubSignIn: () => void;
  handleGoogleSignIn: () => void;
}

export default function SignInSide({
  handleGithubSignIn,
  handleGoogleSignIn,
}: SignInSideProps) {
  // Define state variables using React.useState() hook
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [emailError, setEmailError] = React.useState(false); // Ajouté
  const [passwordError, setPasswordError] = React.useState(false); // Ajouté
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  const [showProgressBar, setShowProgressBar] = React.useState(false); // Ajouté
  // Event handler for password change event
  const handlePasswordChange = (e: { target: { value: any } }) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
    setPasswordError(false); // Réinitialiser l'erreur lors de la modification de la valeur
    setShowProgressBar(newPassword.length > 0); // Ajouté
  };
  // Determine the color of the password strength bar
  const passwordStrengthColor =
    passwordStrength === 4
      ? 'success'
      : passwordStrength >= 2
      ? 'warning'
      : 'error';
  // Event handler for form submit event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Réinitialiser les erreurs
    setEmailError(false);
    setPasswordError(false);

    // Validation de l'email
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      setError(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    }

    // Validation du mot de passe (doit contenir au moins une majuscule)
    if (!/[A-Z]/.test(password)) {
      setPasswordError(true);
      setError('Le mot de passe doit contenir au moins une majuscule.');
      return;
    }

    try {
      // Créez un nouvel utilisateur avec un courrier électronique et un mot de passe en utilisant Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirigez vers la page protégée après une inscription réussie
      window.location.href = '/protected';
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError(true);
        setError(ERROR_MESSAGES.EMAIL_IN_USE);
      } else {
        setError(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          component="div"
          sx={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              minHeight: '100%',
              width: '75%',
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ paddingBottom: '20px', fontSize: '3rem' }}
            >
              <span>Hello</span>, <strong>Welcome Back!</strong>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: '35px',
                textAlign: 'left',
                fontSize: '1.15rem',
                color: Theme.palette.grey[600],
              }}
            >
              We're happy to see you again, let's explore the world of cinema
              together!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingBottom: 6,
                mb: 1,
              }}
            >
              <SignInProviders
                handleGithubSignIn={handleGithubSignIn}
                handleGoogleSignIn={handleGoogleSignIn}
              />
            </Box>
            <Typography
              variant="caption"
              component="div"
              sx={{
                width: '100%',
                textAlign: 'center',
                borderBottom: '1px solid',
                lineHeight: '0.1em',
                mb: 2,
                color: Theme.palette.grey[600],
              }}
            >
              <Box
                component="span"
                sx={{
                  background: Theme.palette.primary.light,
                  px: 1,
                  color: Theme.palette.grey[600],
                  fontSize: '15px',
                }}
              >
                Or Continue With
              </Box>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%', mt: 1 }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, color: Theme.palette.grey[600] }}
              >
                Email
              </Typography>
              <EmailField
                email={email}
                setEmail={setEmail}
                emailError={emailError}
                setEmailError={setEmailError}
              />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, color: Theme.palette.grey[600] }}
              >
                Password
              </Typography>
              <PasswordField
                password={password}
                setPassword={handlePasswordChange}
                showPassword={showPassword}
                setShowPassword={handleClickShowPassword}
                passwordError={passwordError}
              />
              {showProgressBar && (
                <LinearProgress
                  variant="determinate"
                  value={(getPasswordStrength(password) / 4) * 100}
                  color={passwordStrengthColor}
                />
              )}
              <Typography
                variant="caption"
                style={{
                  color:
                    passwordStrengthMessage[getPasswordStrength(password)]
                      .color,
                  marginTop: '5px',
                }}
              >
                {passwordStrengthMessage[getPasswordStrength(password)].message}
              </Typography>
              <Link
                href="#"
                variant="body2"
                component="a"
                sx={{
                  alignSelf: 'flex-end',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  color: 'black',
                  fontWeight: 'bold',
                  pb: 2,
                }}
              >
                Forgot Password?
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  height: '3rem',
                  fontWeight: 600,
                }}
                className={styles.signInButton}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
