// BaseNode.jsx
// Single-responsibility: layout, styling, and handle rendering for ALL node types.
// Open for extension (via children + props), closed for modification.

import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, Box, Typography, Chip, Stack, Divider } from '@mui/material';
import { NODE_COLORS } from '../theme';

/**
 * BaseNode
 *
 * @param {string}   id       - ReactFlow node id
 * @param {string}   title    - Display title shown in node header
 * @param {string}   type     - Node type key (used for colour lookup)
 * @param {React.ReactNode} icon - MUI icon element shown beside the title
 * @param {string[]} inputs   - Array of handle ids rendered on the LEFT as target handles
 * @param {string[]} outputs  - Array of handle ids rendered on the RIGHT as source handles
 * @param {React.ReactNode} children - Node-specific content (fields, selects, etc.)
 * @param {object}   sx       - Extra MUI sx overrides for the Card
 */

const BaseNode = ({
  id,
  title,
  type,
  icon,
  inputs = [],
  outputs = [],
  children,
  sx = {},
}) => {
  const accentColor = NODE_COLORS[type] || '#7C3AED';

  // Compute evenly-spaced % top positions for handles, avoiding 0% and 100% edges
  const handleTop = (index, total) => {
    if (total === 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <Card
      sx={{
        width: 250,
        position: 'relative',
        borderRadius: 3,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
        background: 'linear-gradient(135deg, #1E293B 0%, #162032 100%)',
        border: `1px solid ${accentColor}44`,
        overflow: 'visible',
        ...sx,
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: `linear-gradient(90deg, ${accentColor}33 0%, transparent 100%)`,
          borderBottom: `1px solid ${accentColor}44`,
          borderRadius: '12px 12px 0 0',
        }}
      >
        {icon && (
          <Box sx={{ color: accentColor, display: 'flex', alignItems: 'center', fontSize: 18 }}>
            {icon}
          </Box>
        )}
        <Typography
          variant="h6"
          sx={{ flex: 1, color: '#F1F5F9', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.02em' }}
        >
          {title}
        </Typography>
        <Chip
          label={title}
          size="small"
          sx={{
            backgroundColor: `${accentColor}22`,
            color: accentColor,
            border: `1px solid ${accentColor}55`,
            fontSize: '0.6rem',
            height: 18,
          }}
        />
      </Box>

      {/* ── Handle labels (inputs left, outputs right) ── */}
      {(inputs.length > 0 || outputs.length > 0) && (
        <Box sx={{ px: 1.5, pt: 0.75, pb: 0.25 }}>
          <Stack direction="row" justifyContent="space-between">
            {/* Input label column */}
            <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
              {inputs.map((inp) => (
                <Typography key={inp} variant="caption" sx={{ color: '#64748B', fontSize: '0.62rem' }}>
                  {inp}
                </Typography>
              ))}
            </Stack>
            {/* Output label column */}
            <Stack spacing={0.5} sx={{ alignItems: 'flex-end' }}>
              {outputs.map((out) => (
                <Typography key={out} variant="caption" sx={{ color: '#64748B', fontSize: '0.62rem' }}>
                  {out}
                </Typography>
              ))}
            </Stack>
          </Stack>
          {children && <Divider sx={{ my: 0.75, borderColor: '#334155' }} />}
        </Box>
      )}

      {/* ── Node-specific content ──────────────────────── */}
      {children && (
        <Box sx={{ px: 1.5, pb: 1.5 }}>
          {children}
        </Box>
      )}

      {/* ── Input Handles (LEFT / target) ─────────────── */}
      {inputs.map((inp, i) => (
        <Handle
          key={`${id}-input-${inp}`}
          type="target"
          position={Position.Left}
          id={`${id}-${inp}`}
          style={{
            top: handleTop(i, inputs.length),
            left: -6,
            width: 12,
            height: 12,
            background: accentColor,
            border: '2px solid #0F172A',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* ── Output Handles (RIGHT / source) ───────────── */}
      {outputs.map((out, i) => (
        <Handle
          key={`${id}-output-${out}`}
          type="source"
          position={Position.Right}
          id={`${id}-${out}`}
          style={{
            top: handleTop(i, outputs.length),
            right: -6,
            width: 12,
            height: 12,
            background: '#06B6D4',
            border: '2px solid #0F172A',
            borderRadius: '50%',
          }}
        />
      ))}
    </Card>
  );
};

export default BaseNode;
