// TextNode.jsx — Part 3: auto-resize + variable detection
import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import BaseNode from './BaseNode';

// Regex that matches {{variableName}} patterns
const VARIABLE_REGEX = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

/**
 * Extract unique variable names from a template string.
 * e.g. "Hello {{name}} from {{city}}" → ["name", "city"]
 */
const extractVariables = (text) => {
  const found = [];
  const seen = new Set();
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    const varName = match[1];
    if (!seen.has(varName)) {
      seen.add(varName);
      found.push(varName);
    }
  }
  return found;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const textareaRef = useRef(null);

  // Mirroring div to track dimensions (for horizontal & vertical growth)
  const mirrorRef = useRef(null);
  const [nodeWidth, setNodeWidth] = useState('auto');

  // Re-run variable extraction and dimension tracking
  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // Handle dimensions based on mirroring div
  useEffect(() => {
    if (mirrorRef.current) {
      // Height is handled by scrollHeight on textarea usually, 
      // but let's sync both for maximum consistency.
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      
      // Horizontal growth: calculate width based on longest line
      const width = mirrorRef.current.offsetWidth;
      setNodeWidth(Math.max(200, width + 40)); // padding adjustment
    }
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      type="text"
      icon={<TextFieldsIcon fontSize="small" />}
      inputs={variables}
      outputs={['output']}
      sx={{ width: nodeWidth }}
    >
      <Box sx={{ mt: 0.5, position: 'relative' }}>
        <Typography variant="caption" sx={{ color: '#64748B', mb: 0.5, display: 'block' }}>
          Template (use {'{{variable}}'} syntax)
        </Typography>
        
        {/* Hidden mirror for measurements */}
        <div
          ref={mirrorRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'pre',
            fontFamily: '"Inter", monospace',                      
            fontSize: '0.78rem',
            lineHeight: 1.5,
            padding: '8px 10px',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        >
          {currText || ' '}
        </div>

        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            background: '#0F172A',
            color: '#F1F5F9',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '8px 10px',
            fontSize: '0.78rem',
            fontFamily: '"Inter", monospace',
            lineHeight: 1.5,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {variables.length > 0 && (
          <Typography variant="caption" sx={{ color: '#06B6D4', mt: 0.5, display: 'block' }}>
            Variables: {variables.map((v) => `{{${v}}}`).join(', ')}
          </Typography>
        )}
      </Box>
    </BaseNode>
  );
};
