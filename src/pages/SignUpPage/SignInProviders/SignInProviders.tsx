import * as React from 'react';
import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Theme from '../../../../Theme/Theme';
import { Box } from '@mui/system';

interface SignInProvidersProps {
  handleGithubSignIn: () => void;
  handleGoogleSignIn: () => void;
}

function SignInProviders({
  handleGithubSignIn,
  handleGoogleSignIn,
}: SignInProvidersProps) {
  return (
    <Box
      display="flex"
      width="100%"
      flexWrap="wrap"
      justifyContent={{ xs: 'center', md: 'space-between' }}
      gap={2}
    >
      <Button
        variant="outlined"
        startIcon={<AiFillGithub size={'40'} />}
        sx={{
          flexGrow: 1,
          borderRadius: '25px 25px 25px 25px',
          borderColor: Theme.palette.grey[600],
          width: { xs: '100%', md: 'auto' },
          height: '5rem',
          textTransform: 'none',
          color: Theme.palette.secondary.main,
        }}
        onClick={handleGithubSignIn} // Ajout de l'appel à la fonction handleGithubSignIn
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
          width: { xs: '100%', md: 'auto' },
          height: '5rem',
          textTransform: 'none',
          color: Theme.palette.secondary.main,
        }}
        onClick={handleGoogleSignIn} // Ajout de l'appel à la fonction handleGoogleSignIn
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
    </Box>
  );
}

export default SignInProviders;
