import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Container, Box, Typography } from '@mui/material';
import FilterSection from './../../components/Dashboard/Filter';
import StatisticsSection from './../../components/Dashboard/StatisticsSection';
import ChartSection from './../../components/Dashboard/ChartSection';
import IconWithText from '../../components/IconWithText';
import Graph from './../../public/Graph.png';
import Statistic from './../../public/Statistic.png';
import withAuth from '../../context/Middleware';
import { getRequest } from '../../hooks/ApiHandler';

const Dashboard = () => {
  const [warrantiesData, setWarrantiesData] = useState(null);

  useEffect(() => {
    const fetchWarranties = async () => {
      try {
        const data = await getRequest('warranties');
        setWarrantiesData(data); 
      } catch (error) {
        console.error('Error fetching warranties data:', error);
      }
    };

    fetchWarranties(); 
  }, []);

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ padding: '30px 0px' }}>
        <FilterSection />
        <Box mt={4}>
          <IconWithText iconSrc={Graph.src} text="Registration Statistics" />
          <StatisticsSection warrantiesData={warrantiesData}/>
        </Box>
        <Box mt={4}>
          <IconWithText iconSrc={Statistic.src} text="Statistics" />
          <ChartSection warrantiesData={warrantiesData} />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
