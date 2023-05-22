import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
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
    fontFamily: 'Prompt, sans-serif',
  },
});

export default Theme;
