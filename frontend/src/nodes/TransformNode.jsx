// TransformNode.jsx
import { useState } from 'react';
import { TextField } from '@mui/material';
import TransformIcon from '@mui/icons-material/Transform';
import BaseNode from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || 'data.map(x => x)');

  return (
    <BaseNode
      id={id}
      title="Transform"
      type="transform"
      icon={<TransformIcon fontSize="small" />}
      inputs={['data']}
      outputs={['result']}
    >
      <TextField
        label="Expression"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        size="small"
        fullWidth
        sx={{ mt: 0.5 }}
        placeholder="e.g. data.map(x => x.trim())"
      />
    </BaseNode>
  );
};
