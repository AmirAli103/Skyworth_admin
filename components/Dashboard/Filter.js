import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Filter = ({ label, options, value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedValue) => {
    setAnchorEl(null);
    onChange(label, selectedValue); // Update parent with selected option
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          borderRadius: '24px',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          color: value ? 'primary' : 'grey.700',
          fontWeight: value ? 'bold' : 'normal',
        }}
      >
        <Typography sx={{ mr: 1 }}>{label}</Typography>
        <Typography fontWeight="bold">{value || 'None'}</Typography>
        <ArrowDropDownIcon sx={{ ml: 1, color: 'grey.500' }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Filter;
