// ApiNode.jsx
import { useState } from 'react';
import { TextField, MenuItem, Stack } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import BaseNode from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      id={id}
      title="API Request"
      type="api"
      icon={<ApiIcon fontSize="small" />}
      inputs={['body']}
      outputs={['response']}
    >
      <Stack spacing={1} sx={{ mt: 0.5 }}>
        <TextField
          select
          label="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          size="small"
          fullWidth
        >
          {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          size="small"
          fullWidth
          placeholder="https://api.example.com/endpoint"
        />
      </Stack>
    </BaseNode>
  );
};
