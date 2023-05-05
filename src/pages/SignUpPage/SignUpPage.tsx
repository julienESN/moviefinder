import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f7f7f4',
      light: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <ThemeProvider theme={theme}>
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
                color: theme.palette.grey[600],
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
              <Button
                variant="outlined"
                startIcon={<FaApple size={'40'} />}
                sx={{
                  flexGrow: 1,
                  borderRadius: '25px 25px 25px 25px',
                  borderColor: theme.palette.grey[600],
                  width: '5rem',
                  height: '5rem',
                  textTransform: 'none',
                  color: theme.palette.secondary.main,
                }}
              >
                <span
                  style={{
                    fontSize: '35px',
                    fontWeight: 500,
                  }}
                >
                  Apple
                </span>
              </Button>
              <Box sx={{ width: '6rem' }}></Box>
              <Button
                variant="outlined"
                startIcon={<FcGoogle size={'40'} />}
                sx={{
                  flexGrow: 1,
                  borderRadius: '25px 25px 25px 25px',
                  borderColor: theme.palette.grey[600],
                  width: '5rem',
                  height: '5rem',
                  textTransform: 'none',
                  color: theme.palette.secondary.main,
                }}
              >
                <span
                  style={{
                    fontSize: '35px',
                    fontWeight: 500,
                  }}
                >
                  Google
                </span>
              </Button>
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
                color: theme.palette.grey[600],
              }}
            >
              <Box
                component="span"
                sx={{
                  background: theme.palette.primary.light,
                  px: 1,
                  color: theme.palette.grey[600],
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
                sx={{ fontWeight: 500, color: theme.palette.grey[600] }}
              >
                Email
              </Typography>
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
              />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, color: theme.palette.grey[600] }}
              >
                Password
              </Typography>
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, height: '3rem', fontWeight: 600 }}
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
