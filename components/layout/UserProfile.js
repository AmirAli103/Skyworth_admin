import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const UserProfile = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar sx={{ width: 56, height: 56, mr: 2 }}>U</Avatar>
      <Typography variant="h6">Username</Typography>
    </Box>
  );
};

export default UserProfile;
