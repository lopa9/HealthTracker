import { createTheme } from '@mui/material/styles';

const fitPulseColors = {
  base: '#f5f5f5',          // Soft light grey for the base background
  surface: '#ffffff',       // Clean white surface for cards and app bars
  overlay: '#e0e0e0',       // Light grey for overlays and backgrounds
  muted: '#9e9e9e',         // Muted gray for less important text
  subtle: '#757575',        // Subtle gray for secondary text
  text: '#212121',          // Dark gray for main text
  love: '#e57373',          // Soft red for error or alerts
  gold: '#ffb74d',          // Warm yellow-gold for warnings or highlights
  rose: '#4caf50',          // Green for primary action buttons and highlights
  pine: '#388e3c',          // Dark green for secondary elements (like success actions)
  foam: '#81d4fa',          // Soft light blue for info elements and highlights
  iris: '#9c27b0',          // Vibrant purple for accent colors
  highlightLow: '#fafafa',  // Very light highlight for subtle elements
  highlightMed: '#eeeeee',  // Medium light highlight for more prominent elements
  highlightHigh: '#bdbdbd', // High light gray for sections with more attention
};

const fitPulseTheme = createTheme({
  palette: {
    mode: 'light',  // Light mode to evoke energy, brightness, and positivity
    background: {
      default: fitPulseColors.base,
      paper: fitPulseColors.surface,
    },
    primary: {
      main: fitPulseColors.rose,  // Energizing green as the primary color
    },
    secondary: {
      main: fitPulseColors.pine,  // Dark green for secondary elements
    },
    error: {
      main: fitPulseColors.love,  // Soft red for errors and alerts
    },
    warning: {
      main: fitPulseColors.gold,  // Gold for warning messages
    },
    info: {
      main: fitPulseColors.foam,  // Light blue for informational messages
    },
    success: {
      main: fitPulseColors.pine,  // Dark green for success actions
    },
    text: {
      primary: fitPulseColors.text,  // Dark text for readability
      secondary: fitPulseColors.subtle,  // Lighter text for less important info
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',  // Clean, modern sans-serif font
    h1: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: fitPulseColors.surface,  // Light background for the app bar
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow effect
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // No uppercase transformation for buttons
          borderRadius: '8px',     // Rounded corners for a modern look
          padding: '10px 20px',    // Comfortable padding for clickable buttons
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
      `,
    },
  },
});

export default fitPulseTheme;
