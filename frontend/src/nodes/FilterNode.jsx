// FilterNode.jsx
import { useState } from 'react';
import { TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BaseNode from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'x > 0');

  return (
    <BaseNode
      id={id}
      title="Filter"
      type="filter"
      icon={<FilterListIcon fontSize="small" />}
      inputs={['data']}
      outputs={['filtered', 'rejected']}
    >
      <TextField
        label="Condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        size="small"
        fullWidth
        sx={{ mt: 0.5 }}
        placeholder="e.g. x.length > 5"
      />
    </BaseNode>
  );
};
