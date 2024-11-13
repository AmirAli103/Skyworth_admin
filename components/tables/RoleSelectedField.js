import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RoleSelectField = ({ name, value, onChange }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
      <InputLabel sx={{ fontFamily: 'kanit' }}>Role</InputLabel>
      <Select
        name={name}
        value={value}
        label="Role"
        onChange={onChange}
        sx={{ fontFamily: 'kanit', borderLeft: '3px solid #0063B2' }}
      >
        <MenuItem value="User">User</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RoleSelectField;
