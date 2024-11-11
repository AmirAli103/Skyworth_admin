import React from 'react';
import { Grid, Paper } from '@mui/material';
import TVSizeDistributionChart from '../charts/TVSizeChart';
import LEDTVSalesChart from '../charts/LEDTVChart';
import TopSellingAreasChart from '../charts/TopSellingAreasChart';
import SectionTitle from '../charts/SectionTitle';
import CustomPieChart from '../charts/PieChart';
import GradientAreaChart from '../charts/GradientAreaChart';

const topSellingAreasData = [
    { name: 'MT', value: 120 },
    { name: 'BT', value: 95 },
    { name: 'DEF', value: 110 },
    { name: 'GR', value: 130 },
    { name: 'BOR', value: 110 },
    { name: 'FT', value: 130 },
    { name: 'BOR', value: 110 },
    { name: 'FT', value: 130 },
    // Add the rest of the data as needed
];

const tvSizeDistributionData = [
    { size: '32"', value: 10 },
    { size: '40"', value: 20 },
    { size: '43"', value: 30 },
    { size: '50"', value: 10 },
    { size: '55"', value: 20 },
    { size: '65"', value: 30 },
    { size: '75"', value: 30 },
    { size: '85"', value: 30 },
    { size: '100"', value: 30 },
    // Add the rest of the sizes
];

const salesByTvTypeData = [
    { type: 'QLED MINI', sales: 80 },
    { type: 'QLED', sales: 70 },
    { type: 'UHD', sales: 60 },
    { type: 'FHD/HD', sales: 90 },
];

const sourceOfInfoData = [
    { name: 'Television', value: 10 },
    { name: 'Social Media', value: 40 },
    { name: 'Social Media', value: 40 },
    { name: 'Store', value: 20 }
];

const purchaseSourceData = [
    { name: 'Dealer Shop', value: 400 },
    { name: 'Large Format Stores', value: 300 },
    { name: 'Online Store', value: 500 },
];

const monthlyRegistrationData = [
    { month: 'Jan', value: 600 },
    { month: 'Feb', value: 800 },
    { month: 'Mar', value: 500 },
    { month: 'Apr', value: 30 },
    { month: 'May', value: 200 },
    { month: 'Jun', value: 500 },
];

const ChartSection = () => (
    <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <TopSellingAreasChart data={topSellingAreasData} title={"Top 10 Most Selling Areas"}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <TVSizeDistributionChart data={tvSizeDistributionData} title={"LED TV Size Distribution"} />
        </Grid>
        <Grid item xs={12} md={4}>
            <LEDTVSalesChart data={salesByTvTypeData} title={"Sales by LED TV Type"}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: "16px 16px 16px 0px" }}>
            <SectionTitle title={"Source of Information"}/>
            <CustomPieChart data={sourceOfInfoData}/>
            </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
        <TopSellingAreasChart data={purchaseSourceData} title={"Purchase Source"}/>
        </Grid>
        <Grid item xs={12} md={4}>
        <GradientAreaChart data={monthlyRegistrationData} title={"Monthly Registration Trend"}/>
        </Grid>

    </Grid>
);

export default ChartSection;
