// submit.js — Part 4: POST to /pipelines/parse and show MUI Dialog
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import {
  Box, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Typography, Chip, CircularProgress,
  Divider, Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [open, setOpen]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult]  = useState(null);
  const [error, setError]    = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        
      const response = await fetch(`${apiUrl}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
      setOpen(true);
    } catch (err) {
      setError(err.message);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 1.5,
          px: 3,
          background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)',
          borderTop: '1px solid #334155',
          gap: 2,
        }}
      >
        <Typography variant="caption" sx={{ color: '#64748B' }}>
          {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
        </Typography>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || nodes.length === 0}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
          sx={{
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            '&:hover': { background: 'linear-gradient(135deg, #A78BFA, #7C3AED)' },
            px: 3,
            py: 0.75,
            borderRadius: 2,
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
          }}
        >
          {loading ? 'Analysing…' : 'Submit Pipeline'}
        </Button>
      </Box>

      {/* ── Analysis Result Dialog ──────────────────────── */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
          <AccountTreeIcon sx={{ color: '#7C3AED' }} />
          Pipeline Analysis
        </DialogTitle>
        <Divider sx={{ borderColor: '#334155' }} />

        <DialogContent sx={{ pt: 2 }}>
          {error ? (
            <Typography color="error" variant="body2">
              ⚠ {error}
            </Typography>
          ) : result ? (
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>Nodes</Typography>
                <Chip
                  label={result.num_nodes}
                  size="small"
                  sx={{ background: '#7C3AED22', color: '#A78BFA', border: '1px solid #7C3AED44', fontWeight: 700 }}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>Edges</Typography>
                <Chip
                  label={result.num_edges}
                  size="small"
                  sx={{ background: '#06B6D422', color: '#67E8F9', border: '1px solid #06B6D444', fontWeight: 700 }}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>Is DAG</Typography>
                <Chip
                  icon={result.is_dag ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                  label={result.is_dag ? 'Yes' : 'No'}
                  size="small"
                  sx={{
                    background: result.is_dag ? '#10B98122' : '#EF444422',
                    color:      result.is_dag ? '#34D399'   : '#F87171',
                    border:     `1px solid ${result.is_dag ? '#10B98144' : '#EF444444'}`,
                    fontWeight: 700,
                  }}
                />
              </Stack>
            </Stack>
          ) : null}
        </DialogContent>

        <Divider sx={{ borderColor: '#334155' }} />
        <DialogActions sx={{ px: 2 }}>
          <Button onClick={() => setOpen(false)} size="small" sx={{ color: '#94A3B8' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
