import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RecentActivities = () => {
  const activities = ['User1 signed in', 'User2 updated profile', 'User3 made a purchase'];

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">Recent Activities</Typography>
        {activities.map((activity, index) => (
          <Typography key={index}>{activity}</Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
