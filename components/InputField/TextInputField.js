// TextInputField.js
import React from 'react';
import { FormControl, InputLabel, FilledInput } from '@mui/material';

const TextInputField = ({ label, type, name, value, onChange }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
      <InputLabel sx={{fontFamily:'kanit',}} htmlFor={`filled-adornment-${label}`}>{label}</InputLabel>
      <FilledInput
        id={`filled-adornment-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          borderLeft: '3px solid #0063B2', // Add a blue left border
          fontFamily:'kanit',
          borderRadius: '4px', // Optional: Add border radius for better aesthetics
        }}
      />
    </FormControl>
  );
};

export default TextInputField;
