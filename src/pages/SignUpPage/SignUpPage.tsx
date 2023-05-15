import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './SignUpPage.module.css';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { LinearProgress } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import EmailField from './EmailField/EmailField';
import PasswordField from './PasswordField/PasswordField';
import SignInProviders from './SignInProviders/SignInProviders';
import Theme from './Theme/Theme';
import zxcvbn from 'zxcvbn';
import { auth } from '../api/auth/firebase';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Define constants at the top of your file
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z|a-z]{2,}$/i;
const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email.',
  PASSWORD_REQUIRES_CAPITAL:
    'Password must contain at least one uppercase letter.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  EMAIL_IN_USE: 'The email address is already in use by another account.',
  INVALID_EMAIL_FIREBASE: 'The email address you entered is not valid.',
  USER_DISABLED: 'This account has been disabled.',
  USER_NOT_FOUND: 'Invalid email/password combination.',
  WRONG_PASSWORD: 'The password you entered is incorrect.',
  WEAK_PASSWORD: 'The password you entered is too weak.',
  TOO_MANY_REQUESTS:
    'We have temporarily disabled your account due to too many login attempts. Please try again later.',
  OPERATION_NOT_ALLOWED:
    'Logging in with this email and password is not enabled. Please contact the application administrator.',
};
// Function to calculate password strength using zxcvbn library
function getPasswordStrength(password: string): number {
  const result = zxcvbn(password);
  const score = result.score;
  return score;
}

// Map password strength to message and color
const passwordStrengthMessage: Record<
  number,
  { message: string; color: string }
> = {
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
  const [errorAlert, setErrorAlert] = React.useState<{
    message: string;
    title: string;
  } | null>(null);

  const [showProgressBar, setShowProgressBar] = React.useState(false); // Ajouté
  // Event handler for password change event
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
    setPasswordError(false);
    setShowProgressBar(newPassword !== ''); // Ajouté
  };
  // Determine the color of the password strength bar
  const passwordStrengthColor =
    passwordStrength === 4
      ? 'success'
      : passwordStrength >= 2
      ? 'warning'
      : 'error';

  // Add this function inside your SignInSide component
  const handleForgotPassword = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (email === '') {
      setEmailError(true);
      setError(
        'Veuillez entrer votre adresse e-mail pour réinitialiser le mot de passe.'
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        'Un e-mail de réinitialisation du mot de passe a été envoyé à ' + email
      );
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'e-mail de réinitialisation du mot de passe :",
        error
      );
    }
  };

  type ButtonAction = 'signup' | 'login';
  // Event handler for form submit event
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>,
    action: ButtonAction
  ): Promise<void> => {
    event.preventDefault();

    // Réinitialiser les erreurs
    setEmailError(false);
    setPasswordError(false);
    setError('');
    setErrorAlert(null);
    // Validation de l'email
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      setError(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    }

    // Validation du mot de passe (doit contenir au moins une majuscule et au moins 8 caractères)
    if (!/^(?=.*[A-Z]).{8,}$/.test(password)) {
      setPasswordError(true);

      return;
    }

    try {
      // Créez un nouvel utilisateur ou connectez-vous avec un courrier électronique et un mot de passe en utilisant Firebase Auth
      if (action === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else if (action === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      }

      // Redirigez vers la page protégée après une inscription réussie
      window.location.href = '/protected';
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
      switch (firebaseError.code) {
        case 'auth/invalid-email':
          errorMessage = ERROR_MESSAGES.INVALID_EMAIL_FIREBASE;
          break;
        case 'auth/user-disabled':
          errorMessage = ERROR_MESSAGES.USER_DISABLED;
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = ERROR_MESSAGES.USER_NOT_FOUND;
          break;
        case 'auth/email-already-in-use':
          errorMessage = ERROR_MESSAGES.EMAIL_IN_USE;
          break;
        case 'auth/weak-password':
          errorMessage = ERROR_MESSAGES.WEAK_PASSWORD;
          break;
        case 'auth/too-many-requests':
          errorMessage = ERROR_MESSAGES.TOO_MANY_REQUESTS;
          break;
        case 'auth/operation-not-allowed':
          errorMessage = ERROR_MESSAGES.OPERATION_NOT_ALLOWED;
          break;
        default:
          errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
      }

      setErrorAlert({ title: 'Error', message: errorMessage });
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
              We&apos;re happy to see you again, let&apos;s explore the world of
              cinema together!
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
            <Box component="form" sx={{ width: '100%', mt: 1 }}>
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
                setError={setError}
              />
              {errorAlert && (
                <Alert severity="error" onClose={() => setErrorAlert(null)}>
                  <AlertTitle>{errorAlert.title}</AlertTitle>
                  {errorAlert.message}
                </Alert>
              )}

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
                setError={setError}
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
                onClick={handleForgotPassword}
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
                onClick={(event) => handleSubmit(event, 'signup')}
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
              <Button
                onClick={(event) => handleSubmit(event, 'login')}
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
                Log In
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
