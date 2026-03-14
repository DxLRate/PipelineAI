// LoggerNode.jsx
import { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import BaseNode from './BaseNode';

const LOG_LEVELS = ['info', 'warn', 'error', 'debug'];

export const LoggerNode = ({ id, data }) => {
  const [level, setLevel] = useState(data?.level || 'info');

  return (
    <BaseNode
      id={id}
      title="Logger"
      type="logger"
      icon={<TerminalIcon fontSize="small" />}
      inputs={['message']}
      outputs={['passthrough']}
    >
      <TextField
        select
        label="Log Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        size="small"
        fullWidth
        sx={{ mt: 0.5 }}
      >
        {LOG_LEVELS.map((l) => (
          <MenuItem key={l} value={l}>{l.toUpperCase()}</MenuItem>
        ))}
      </TextField>
    </BaseNode>
  );
};
