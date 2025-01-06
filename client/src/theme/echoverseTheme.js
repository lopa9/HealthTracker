import { createTheme } from '@mui/material/styles';

const echoverseColors = {
  base: '#0A0E1A',          // Cosmic navy for the base background
  surface: '#131926',       // Midnight blue for cards and app bars
  overlay: '#1E2433',       // Deep blue-gray for overlays
  muted: '#596275',         // Muted gray-blue for less important text
  subtle: '#A4B0BE',        // Subtle gray for secondary text
  text: '#FFFFFF',          // Light gray for main text
  love: '#FF1744',          // Vibrant red for error or alerts
  gold: '#FFC107',          // Golden yellow for warnings or highlights
  rose: '#29B6F6',          // Bright blue for primary action buttons and highlights
  pine: '#4CAF50',          // Refreshing green for secondary elements
  foam: '#BB86FC',          // Soft lavender for info elements
  iris: '#FF7043',          // Radiant orange for accent colors
  highlightLow: '#1A1F2A',  // Darker highlight for subtle elements
  highlightMed: '#2C3648',  // Medium highlight for more prominent elements
  highlightHigh: '#3B4A5C', // Lighter blue-gray for sections with more attention
};

const echoverseTheme = createTheme({
  palette: {
    mode: 'dark',  // Dark mode to evoke a cosmic and futuristic atmosphere
    background: {
      default: echoverseColors.base,
      paper: echoverseColors.surface,
    },
    primary: {
      main: echoverseColors.rose,  // Bright blue as the primary color
    },
    secondary: {
      main: echoverseColors.pine,  // Refreshing green for secondary elements
    },
    error: {
      main: echoverseColors.love,  // Vibrant red for errors and alerts
    },
    warning: {
      main: echoverseColors.gold,  // Golden yellow for warning messages
    },
    info: {
      main: echoverseColors.foam,  // Soft lavender for informational messages
    },
    success: {
      main: echoverseColors.pine,  // Refreshing green for success actions
    },
    text: {
      primary: echoverseColors.text,  // Light gray for readability
      secondary: echoverseColors.subtle,  // Subtle gray for less important info
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',  // Clean, modern sans-serif font
    h1: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 800,
    },
    h2: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 600,
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
      fontWeight: 400,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: echoverseColors.surface,  // Midnight blue for the app bar
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',  // Subtle shadow effect
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // No uppercase transformation for buttons
          borderRadius: '8px',     // Slightly rounded corners for a modern look
          padding: '12px 24px',    // Comfortable padding for clickable buttons
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)', // Subtle shadow for depth
        },
      },
    },
  },
});

export default echoverseTheme;
