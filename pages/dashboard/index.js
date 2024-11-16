import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import ChartSection from './../../components/Dashboard/ChartSection';
import withAuth from '../../context/Middleware';
import { getRequest } from '../../hooks/ApiHandler';
import FilterBar from '../../components/Dashboard/Filterwithoutscroll';

const Dashboard = () => {
  const [warrantiesData, setWarrantiesData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchWarranties = async () => {
      
      try {
        const data = await getRequest('warranties');
        setWarrantiesData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching warranties data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWarranties();
  }, []);

  const handleFilterChange = (filters) => {
    if (!warrantiesData) return;


    if (typeof filters !== 'object') {
      console.error("Filters is not an object:", filters);
      return;
    }

    const newFilteredData = warrantiesData.filter((item) =>
      Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        if (!filterValue) return true; // If filter is empty, skip this key
        return item[key.toLowerCase()] === filterValue || item[key] === filterValue;
      })
    );

    setFilteredData(newFilteredData);
  };

  // const handleDateRangeChange = (startDate, endDate) => {
  //   const normalizedStartDate = new Date(startDate.setHours(0, 0, 0, 0));
  //   const normalizedEndDate = new Date(endDate.setHours(23, 59, 59, 999));
  //   const Data=filteredData?filteredData:warrantiesData;
  //   const newFilteredData = Data.filter(item => {
  //     const itemDate = new Date(item.createdAt);
  //     const normalizedItemDate = new Date(itemDate.setHours(0, 0, 0, 0));

  //     return normalizedItemDate >= normalizedStartDate && normalizedItemDate <= normalizedEndDate;
  //   });
  //   setFilteredData(newFilteredData);
  // };

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ padding: '30px 0px' }}>
        {isLoading ? (
          <>
            <Box display="flex" sx={{ height: '100vh' }} justifyContent="center" alignItems="center" mt={4}>
              <CircularProgress />
              <Typography variant="body1" ml={2}>Loading data...</Typography>
            </Box></>
        ) : (
          <>
            <FilterBar onFilterChange={handleFilterChange} />
            <Box mt={4}>
              {/* <IconWithText
            iconSrc={Statistic.src}
            text="Statistics"
            DateRangeShow={true}
            data={filteredData}
            onDateRangeChange={handleDateRangeChange}
          /> */}
             
            </Box>
            <Box mt={4}>
              <ChartSection warrantiesData={filteredData} />
            </Box>
          </>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
