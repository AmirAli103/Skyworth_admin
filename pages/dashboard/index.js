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
import FilterBar from '../../components/Dashboard/Filterwithoutscroll';

const Dashboard = () => {
  const [warrantiesData, setWarrantiesData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchWarranties = async () => {
      try {
        const data = await getRequest('warranties');
        setWarrantiesData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching warranties data:', error);
      }
    };
    fetchWarranties();
  }, []);

  const handleFilterChange = (filters) => {
    if (!warrantiesData) return;

    const newFilteredData = warrantiesData.filter((item) =>
      filters.every((filter) => !filter.value || item[filter.label.toLowerCase()] === filter.value)
    );
    setFilteredData(newFilteredData);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ padding: '30px 0px' }}>
        <FilterBar onFilterChange={handleFilterChange} />
        <Box mt={4}>
          <IconWithText iconSrc={Graph.src} text="Registration Statistics" />
          <StatisticsSection warrantiesData={filteredData} />
        </Box>
        <Box mt={4}>
          <IconWithText iconSrc={Statistic.src} text="Statistics" data={filteredData}/>
          <ChartSection warrantiesData={filteredData} />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
