// OutputNode.jsx
import { useState } from 'react';
import { TextField, MenuItem, Stack } from '@mui/material';
import OutputIcon from '@mui/icons-material/Output';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      type="customOutput"
      icon={<OutputIcon fontSize="small" />}
      inputs={['value']}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          size="small"
          fullWidth
        >
          <MenuItem value="Text">Text</MenuItem>
          <MenuItem value="Image">Image</MenuItem>
        </TextField>
      </Stack>
    </BaseNode>
  );
};
