// pages/dashboard.js
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

import { Container, Grid, Box, Typography, Paper, Button } from '@mui/material';
import FilterSection from './../../components/Dashboard/Filter';
import StatisticsSection from './../../components/Dashboard/StatisticsSection';
import ChartSection from './../../components/Dashboard/ChartSection';
const Dashboard = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
      <FilterSection />

      <Box mt={4}>
        <Typography variant="h6">Registration Statistics</Typography>
        <StatisticsSection />
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Statistics</Typography>
        <ChartSection />
      </Box>
    </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
