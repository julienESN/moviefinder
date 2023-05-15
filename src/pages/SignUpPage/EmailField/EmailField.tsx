// EmailField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText'; // Ajouté

interface EmailFieldProps {
  email: string;
  setEmail: (value: string) => void;
  emailError: boolean;
  setEmailError: (value: boolean) => void;
  setError: (value: string) => void;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z|a-z]{2,}$/i;
const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email.',
  PASSWORD_REQUIRES_CAPITAL:
    'Password must contain at least one uppercase letter.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  EMAIL_IN_USE: 'The email address is already in use by another account.',
  INVALID_EMAIL_FIREBASE:
    "L'adresse e-mail que vous avez entrée n'est pas valide.",
  USER_DISABLED: 'Ce compte a été désactivé.',
  USER_NOT_FOUND:
    "Il n'y a pas d'utilisateur correspondant à cette adresse e-mail.",
  WRONG_PASSWORD: 'Le mot de passe que vous avez entré est incorrect.',
  WEAK_PASSWORD: 'Le mot de passe que vous avez entré est trop faible.',
  TOO_MANY_REQUESTS:
    'Nous avons temporairement désactivé votre compte en raison de trop nombreuses tentatives de connexion. Veuillez réessayer plus tard.',
  OPERATION_NOT_ALLOWED:
    "La connexion avec cet e-mail et ce mot de passe n'est pas activée. Veuillez contacter l'administrateur de l'application.",
};

const EmailField: React.FC<EmailFieldProps> = ({
  email,
  setEmail,
  emailError,
  setEmailError,
  setError,
}) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        variant="outlined"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (!EMAIL_REGEX.test(e.target.value)) {
            setEmailError(true);
            setError(ERROR_MESSAGES.INVALID_EMAIL);
          } else {
            setEmailError(false);
          }
        }}
        error={emailError}
      />
      {emailError && (
        <FormHelperText error={emailError}>
          {ERROR_MESSAGES.INVALID_EMAIL}
        </FormHelperText>
      )}
    </>
  );
};

export default EmailField;
