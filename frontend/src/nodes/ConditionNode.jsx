// ConditionNode.jsx
import { useState } from 'react';
import { TextField } from '@mui/material';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import BaseNode from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || 'value === true');

  return (
    <BaseNode
      id={id}
      title="Condition"
      type="condition"
      icon={<DeviceHubIcon fontSize="small" />}
      inputs={['value']}
      outputs={['true', 'false']}
    >
      <TextField
        label="Expression"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        size="small"
        fullWidth
        sx={{ mt: 0.5 }}
        placeholder="e.g. value.length > 10"
      />
    </BaseNode>
  );
};
