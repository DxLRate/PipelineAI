// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    secondary: {
      main: '#06B6D4',
      light: '#67E8F9',
      dark: '#0891B2',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    divider: '#334155',
    success: { main: '#10B981' },
    warning: { main: '#F59E0B' },
    error:   { main: '#EF4444' },
    info:    { main: '#3B82F6' },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6:    { fontWeight: 600, fontSize: '0.95rem' },
    body2: { fontSize: '0.78rem' },
    caption: { fontSize: '0.7rem' },
  },

  shape: { borderRadius: 12 },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #334155',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.65rem' },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: '0.78rem',
            '& fieldset': { borderColor: '#334155' },
            '&:hover fieldset': { borderColor: '#7C3AED' },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { backgroundImage: 'none', border: '1px solid #334155' },
      },
    },
  },
});

// Node-type colour map — used by BaseNode header
export const NODE_COLORS = {
  customInput:  '#7C3AED',
  text:         '#0891B2',
  llm:          '#D97706',
  customOutput: '#059669',
  api:          '#2563EB',
  transform:    '#7C3AED',
  filter:       '#DC2626',
  condition:    '#D97706',
  logger:       '#6B7280',
};

export default theme;
