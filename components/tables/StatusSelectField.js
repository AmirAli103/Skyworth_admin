import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const StatusSelectField = ({ name, value, onChange }) => {
  const handleSelectChange = (event) => {
    const newValue = event.target.value === 'Active' ? true : false;
    onChange({ target: { name, value: newValue } });
  };

  return (
    <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
      <InputLabel sx={{ fontFamily: 'kanit' }}>Status</InputLabel>
      <Select
        name={name}
        value={value === true ? 'Active' : 'Deactivated'}
        onChange={handleSelectChange}
        sx={{ fontFamily: 'kanit', borderLeft: '3px solid #0063B2' }}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Deactivated">Deactivated</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StatusSelectField;
