// PasswordField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import FormHelperText from '@mui/material/FormHelperText';
import LockRounded from '@mui/icons-material/LockRounded';

interface PasswordFieldProps {
  password: string;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  passwordError: boolean;
  setError: (value: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  handlePasswordChange,
  showPassword,
  setShowPassword,
  passwordError,
  setError,
}) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockRounded />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
        style={{ borderRadius: 20 }}
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
