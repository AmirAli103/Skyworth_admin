import React from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const FilterSection = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <FormControl variant="outlined">
          <InputLabel>Provenance</InputLabel>
          <Select label="Provenance" defaultValue="">
            <MenuItem value="Punjab">Punjab</MenuItem>
            <MenuItem value="Sindh">Sindh</MenuItem>
            {/* Add more options */}
          </Select>
        </FormControl>
      </Grid>
      {/* Repeat for other filters like City, Area, Gender, etc. */}
    </Grid>
  );
};

export default FilterSection;
