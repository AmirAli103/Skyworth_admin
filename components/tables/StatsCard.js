import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value }) => {
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h6">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
