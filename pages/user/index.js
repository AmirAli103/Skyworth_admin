// pages/settings.js
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Box, Typography } from '@mui/material';
import UserTable from '../../components/tables/UserTable';

const Settings = () => {
  return (
    <DashboardLayout>
      <Box sx={{ bgcolor: '#F8F8F8', color: 'white', p: 3, minHeight: '90vh' }}>
        <UserTable/>
      </Box>
    </DashboardLayout>
  );
};

export default Settings;
