import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Container, Box } from '@mui/material';
import StatisticsSection from './../../components/Dashboard/StatisticsSection';
import ChartSection from './../../components/Dashboard/ChartSection';
import IconWithText from '../../components/IconWithText';
import Graph from './../../public/Graph.png';
import Statistic from './../../public/Statistic.png';
import withAuth from '../../context/Middleware';
import { getRequest } from '../../hooks/ApiHandler';
import FilterBar from '../../components/Dashboard/Filterwithoutscroll';
import dayjs from 'dayjs';

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
    console.log(filters)
    if (!Array.isArray(filters)) {
      console.error("Filters is not an array:", filters);
      return;
    }
    const newFilteredData = warrantiesData.filter((item) =>
      filters.every((filter) => !filter.value || item[filter.label.toLowerCase()] === filter.value || item[filter.label] === filter.value)
    );
    setFilteredData(newFilteredData);
  };
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateRangeChange = (newRange) => {
    const [startDate, endDate] = newRange;
    setDateRange(newRange);
    console.log(startDate)
    console.log(endDate)
    // Filter the data based on the selected date range
    const newFilteredData = filteredData.filter(item => {
      const itemDate = dayjs(item.createdAt); // Assuming `createdAt` field in your data
      return itemDate.isBetween(startDate, endDate, null, '[]');
    });

    setFilteredData(newFilteredData);
  };
  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ padding: '30px 0px' }}>
        <FilterBar onFilterChange={handleFilterChange} />
        <Box mt={4}>
          <IconWithText iconSrc={Graph.src} text="Registration Statistics" />
          <StatisticsSection warrantiesData={filteredData} data={warrantiesData} />
        </Box>
        <Box mt={4}>
          <IconWithText
            iconSrc={Statistic.src}
            text="Statistics"
            data={filteredData}
            onDateRangeChange={handleDateRangeChange}
          />
          <ChartSection warrantiesData={filteredData} />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
