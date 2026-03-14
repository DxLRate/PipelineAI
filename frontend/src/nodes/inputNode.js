// InputNode.jsx
import { useState } from 'react';
import { TextField, MenuItem, Stack } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import BaseNode from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      type="customInput"
      icon={<InputIcon fontSize="small" />}
      outputs={['value']}
    >
      <Stack spacing={1} sx={{ mt: 0.5 }}>
        <TextField
          label="Name"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          size="small"
          fullWidth
        />
        <TextField
          select
          label="Type"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          size="small"
          fullWidth
        >
          <MenuItem value="Text">Text</MenuItem>
          <MenuItem value="File">File</MenuItem>
        </TextField>
      </Stack>
    </BaseNode>
  );
};
