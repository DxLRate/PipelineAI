import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
        <PipelineToolbar />
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <PipelineUI />
        </Box>
        <SubmitButton />
      </Box>
    </ThemeProvider>
  );
}

export default App;
