// PasswordField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import FormHelperText from '@mui/material/FormHelperText'; // Ajouté

interface PasswordFieldProps {
  password: string;
  setPassword: React.ChangeEventHandler<HTMLInputElement>;
  showPassword: boolean;
  setShowPassword: () => void;
  passwordError: boolean;
  setError: (value: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  passwordError,
  setError,
}) => {
  return (
    <>
      <TextField
        margin="normal"
        borderRadius="20px"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" color="inherit" onClick={setShowPassword}>
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={setPassword}
        error={passwordError}
      />
      {passwordError && (
        <FormHelperText error={passwordError}>
          Le mot de passe doit contenir au moins une majuscule et au moins 8
          caractères.
        </FormHelperText>
      )}
    </>
  );
};

export default PasswordField;
