// toolbar.js — updated with all 9 nodes and MUI AppBar styling

import { AppBar, Toolbar, Box, Typography, Tooltip } from '@mui/material';
import { DraggableNode } from './draggableNode';

const NODE_ENTRIES = [
  // type, label
  { type: 'customInput',  label: 'Input' },
  { type: 'text',         label: 'Text' },
  { type: 'llm',          label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'api',          label: 'API' },
  { type: 'transform',    label: 'Transform' },
  { type: 'filter',       label: 'Filter' },
  { type: 'condition',    label: 'Condition' },
  { type: 'logger',       label: 'Logger' },
];

export const PipelineToolbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)',
        borderBottom: '1px solid #334155',
        zIndex: 10,
      }}
    >
      <Toolbar variant="dense" sx={{ gap: 2, minHeight: 56 }}>
        {/* Brand */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            mr: 2,
            whiteSpace: 'nowrap',
          }}
        >
          ⚡ PipelineAI
        </Typography>

        {/* Divider */}
        <Box sx={{ width: '1px', height: 28, background: '#334155', flexShrink: 0 }} />

        <Typography variant="caption" sx={{ color: '#64748B', mr: 1, whiteSpace: 'nowrap' }}>
          Drag nodes →
        </Typography>

        {/* Node chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, overflow: 'auto' }}>
          {NODE_ENTRIES.map(({ type, label }) => (
            <Tooltip key={type} title={`Drag to add ${label} node`} arrow>
              <span>
                <DraggableNode type={type} label={label} />
              </span>
            </Tooltip>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
