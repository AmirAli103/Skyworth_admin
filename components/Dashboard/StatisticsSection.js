import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const stats = [
  { title: "Total Registered", value: "200" },
  { title: "Most Popular Type", value: "Slim" },
  { title: "Popular Size", value: "50”" },
  { title: "Purchasing Source", value: "Online" },
  { title: "Males", value: "60%" },
  { title: "Females", value: "40%" },
];

const StatisticsSection = () => (
  <Grid container spacing={2}>
    {stats.map((stat) => (
      <Grid item xs={6} sm={4} md={2} key={stat.title}>
        <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">{stat.title}</Typography>
          <Typography variant="h6">{stat.value}</Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default StatisticsSection;
