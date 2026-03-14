// LLMNode.jsx
import { Typography, Box } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      type="llm"
      icon={<SmartToyIcon fontSize="small" />}
      inputs={['system', 'prompt']}
      outputs={['response']}
    >
      <Box
        sx={{
          mt: 0.5,
          px: 1,
          py: 0.75,
          borderRadius: 1.5,
          background: '#D9770615',
          border: '1px solid #D9770630',
        }}
      >
        <Typography variant="caption" sx={{ color: '#94A3B8', lineHeight: 1.4 }}>
          Large language model inference node. Connect a system prompt and user
          prompt to generate a response.
        </Typography>
      </Box>
    </BaseNode>
  );
};
