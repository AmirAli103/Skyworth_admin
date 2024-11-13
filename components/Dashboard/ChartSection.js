import React from 'react';
import { Grid, Paper } from '@mui/material';
import TVSizeDistributionChart from '../charts/TVSizeChart';
import LEDTVSalesChart from '../charts/LEDTVChart';
import TopSellingAreasChart from '../charts/TopSellingAreasChart';
import SectionTitle from '../charts/SectionTitle';
import CustomPieChart from '../charts/PieChart';
import GradientAreaChart from '../charts/GradientAreaChart';

// Assuming warrantiesData is passed as props
const ChartSection = ({ warrantiesData }) => {
    // Group data by city/province or create a count for each region
    const topSellingAreasData = warrantiesData ? warrantiesData.reduce((acc, item) => {
        const region = item.city || item.province;  // Use city or province as region
        if (!acc[region]) acc[region] = 0;
        acc[region] += 1;
        return acc;
    }, {}) : [];

    // Group data by TV size
    const tvSizeDistributionData = warrantiesData ? warrantiesData.reduce((acc, item) => {
        const size = item.size;
        if (!acc[size]) acc[size] = 0;
        acc[size] += 1;
        return acc;
    }, {}) : [];

    // Group data by TV type
    const salesByTvTypeData = warrantiesData ? warrantiesData.reduce((acc, item) => {
        const type = item.type;
        if (!acc[type]) acc[type] = 0;
        acc[type] += 1;
        return acc;
    }, {}) : [];

    // Group data by advertisement source
    const sourceOfInfoData = warrantiesData ? warrantiesData.reduce((acc, item) => {
        const source = item.advertisementSource;
        if (!acc[source]) acc[source] = 0;
        acc[source] += 1;
        return acc;
    }, {}) : [];

    // Group data by buying shop
    const purchaseSourceData = warrantiesData ? warrantiesData.reduce((acc, item) => {
        const shop = item.buyingShop;
        if (!acc[shop]) acc[shop] = 0;
        acc[shop] += 1;
        return acc;
    }, {}) : [];

    // Group data by month
    const monthlyRegistrationData = warrantiesData ? warrantiesData.reduce((acc, item) => {
        const month = new Date(item.purchaseDate).toLocaleString('default', { month: 'short' });  // Get month name
        if (!acc[month]) acc[month] = 0;
        acc[month] += 1;
        return acc;
    }, {}) : [];

    return (
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
    );
};

export default ChartSection;
