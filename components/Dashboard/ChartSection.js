import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TVSizeDistributionChart from '../charts/TVSizeChart';
import LEDTVSalesChart from '../charts/LEDTVChart';
import TopSellingAreasChart from '../charts/TopSellingAreasChart';
import SectionTitle from '../charts/SectionTitle';
import CustomPieChart from '../charts/PieChart';
import GradientAreaChart from '../charts/GradientAreaChart';
import IconWithText from '../IconWithText';
import Statistic from './../../public/Statistic.png';
import StatisticsSection from './StatisticsSection';
import Graph from './../../public/Graph.png';
const ChartSection = ({ warrantiesData = [] }) => {
    const [filteredData, setFilteredData] = useState(warrantiesData);

    useEffect(() => {
        setFilteredData(warrantiesData);
    }, [warrantiesData]);

    const handleDateRangeChange = (startDate, endDate) => {
        const normalizedStartDate = new Date(startDate.setHours(0, 0, 0, 0));
        const normalizedEndDate = new Date(endDate.setHours(23, 59, 59, 999));
        const newFilteredData = warrantiesData.filter(item => {
            const itemDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
            return itemDate >= normalizedStartDate && itemDate <= normalizedEndDate;
        });
        setFilteredData(newFilteredData);
    };

    const topSellingAreasData = filteredData.reduce((acc, item) => {
        const region = item.city || item.province;
        if (!acc[region]) acc[region] = 0;
        acc[region] += 1;
        return acc;
    }, {});

    const tvSizeDistributionData = filteredData.reduce((acc, item) => {
        const size = item.size;
        if (!acc[size]) acc[size] = 0;
        acc[size] += 1;
        return acc;
    }, {});

    const salesByTvTypeData = filteredData.reduce((acc, item) => {
        const type = item.type;
        if (!acc[type]) acc[type] = 0;
        acc[type] += 1;
        return acc;
    }, {});

    const sourceOfInfoData = filteredData.reduce((acc, item) => {
        const source = item.advertisementSource;
        if (!acc[source]) acc[source] = 0;
        acc[source] += 1;
        return acc;
    }, {});

    const purchaseSourceData = filteredData.reduce((acc, item) => {
        const shop = item.buyingShop;
        if (!acc[shop]) acc[shop] = 0;
        acc[shop] += 1;
        return acc;
    }, {});

    const monthlyRegistrationData = filteredData.reduce((acc, item) => {
        const month = new Date(item.purchaseDate).toLocaleString('default', { month: 'short' });
        if (!acc[month]) acc[month] = 0;
        acc[month] += 1;
        return acc;
    }, {});

    return (
        <Box>
            <IconWithText iconSrc={Graph.src} text="Registration Statistics" DateRangeShow={true} data={filteredData} onDateRangeChange={handleDateRangeChange} />
            <StatisticsSection warrantiesData={filteredData} />
            <Box sx={{mt:4}}>
            <IconWithText iconSrc={Statistic.src} text="Statistics"/>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TopSellingAreasChart data={Object.entries(topSellingAreasData).map(([name, value]) => ({ name, value }))} title={"Top 10 Most Selling Areas"} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TVSizeDistributionChart data={Object.entries(tvSizeDistributionData).map(([size, value]) => ({ size, value }))} title={"LED TV Size Distribution"} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <LEDTVSalesChart data={Object.entries(salesByTvTypeData).map(([type, sales]) => ({ type, sales }))} title={"Sales by LED TV Type"} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style={{ padding: "16px 16px 16px 0px" }}>
                        <SectionTitle title={"Source of Information"} />
                        <CustomPieChart data={Object.entries(sourceOfInfoData).map(([name, value]) => ({ name, value }))} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TopSellingAreasChart data={Object.entries(purchaseSourceData).map(([name, value]) => ({ name, value }))} title={"Purchase Source"} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <GradientAreaChart data={Object.entries(monthlyRegistrationData).map(([month, value]) => ({ month, value }))} title={"Monthly Registration Trend"} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChartSection;
