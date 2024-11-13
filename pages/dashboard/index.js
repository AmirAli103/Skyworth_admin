import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Container, Box, Typography } from '@mui/material';
import FilterSection from './../../components/Dashboard/Filter';
import StatisticsSection from './../../components/Dashboard/StatisticsSection';
import ChartSection from './../../components/Dashboard/ChartSection';
import IconWithText from '../../components/IconWithText';
import Graph from './../../public/Graph.png'
import Statistic from './../../public/Statistic.png'
import withAuth from '../../context/Middleware';
const Dashboard = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{padding:'30px 0px'}}>
      <FilterSection />
      <Box mt={4}>
      <IconWithText iconSrc={Graph.src} text="Registration Statistics" />
        <StatisticsSection />
      </Box>
      <Box mt={4}>
        <IconWithText iconSrc={Statistic.src} text="Statistics" />
        <ChartSection />
      </Box>
    </Container>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
