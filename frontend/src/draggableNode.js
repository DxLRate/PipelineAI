// draggableNode.js — MUI-styled drag chips for the toolbar

import { Paper, Typography, Box } from '@mui/material';
import { NODE_COLORS } from './theme';

export const DraggableNode = ({ type, label }) => {
  const color = NODE_COLORS[type] || '#7C3AED';

  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Paper
      draggable
      onDragStart={onDragStart}
      onDragEnd={(e) => (e.target.style.cursor = 'grab')}
      elevation={0}
      sx={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        borderRadius: 2,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        userSelect: 'none',
        transition: 'all 0.15s ease',
        '&:hover': {
          background: `${color}28`,
          border: `1px solid ${color}88`,
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${color}22`,
        },
        '&:active': { transform: 'scale(0.96)', cursor: 'grabbing' },
      }}
    >
      {/* colour dot */}
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }}
      />
      <Typography
        variant="body2"
        sx={{ color, fontWeight: 600, fontSize: '0.72rem', whiteSpace: 'nowrap' }}
      >
        {label}
      </Typography>
    </Paper>
  );
};