import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00b14f',
      dark: '#008e3f',
      light: '#e6f7ef',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff9800',
    },
    darkNav: {
      main: '#003426',
      dark: '#00251a',
    },
    text: {
      primary: '#212f3f',
      secondary: '#666666',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

export default theme;
