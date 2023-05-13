// EmailField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';

interface EmailFieldProps {
  email: string;
  setEmail: (value: string) => void;
  emailError: boolean;
  setEmailError: (value: boolean) => void; // Ajoutez cette ligne
}

const EmailField: React.FC<EmailFieldProps> = ({
  email,
  setEmail,
  emailError,
  setEmailError, // Et cette ligne
}) => {
  return (
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
        setEmailError(false); // Modifiez cette ligne
      }}
      error={emailError}
      helperText={emailError && 'Adresse incorrecte ou déjà utilisée.'}
    />
  );
};

export default EmailField;
