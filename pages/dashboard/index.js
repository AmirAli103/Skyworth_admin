// pages/dashboard.js
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import UserProfile from '../../components/layout/UserProfile';
import StatsCard from '../../components/tables/StatsCard';
import RecentActivities from '../../components/tables/RecentActivity';
import Chart from '../../components/charts/chart';
import DataTable from '../../components/tables/Table';
import { Grid, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard title="Total Users" value="1,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard title="Total Sales" value="$50,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard title="Pending Orders" value="20" />
        </Grid>
      </Grid>
      <Box sx={{ my: 3 }}>
        <Chart />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivities />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataTable />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
