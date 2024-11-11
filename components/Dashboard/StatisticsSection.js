import React from 'react';
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import RegisterIcon from './../../public/Frame.png';
import Source from './../../public/Source.png';
import Size from './../../public/Size.png';
import Gender from './../../public/Gender.png';
import Type from './../../public/Type.png';
import Image from 'next/image';

const stats = [
    { title: "Total Registered", value: "200", icon: <Image src={RegisterIcon.src} alt="Total Registered Icon" width={60} height={60} /> },
    { title: "Most Popular Type", value: "Slim", icon: <Image src={Type.src} alt="Most Popular Type Icon" width={60} height={60} /> },
    { title: "Popular Size", value: "50”", icon: <Image src={Size.src} alt="Popular Size Icon" width={60} height={60} /> },
    { title: "Purchasing Source", value: "Online", icon: <Image src={Source.src} alt="Purchasing Source Icon" width={60} height={60} /> },
    {
        title: "",
        values: [
            { label: "Males", value: "60%" },
            { label: "Females", value: "40%" }
        ],
        icon: <Image src={Gender.src} alt="Gender Icon" width={60} height={60} />
    }
];

const StatisticsSection = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={2}>
            {stats.map((stat) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={stat.title}>
                    <Paper
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            display: 'flex',
                            flexDirection: isSmallScreen ? 'column' : 'row',
                            alignItems: 'center',
                            height: '100%',
                            boxShadow: '#EEEEEE80',
                            background: '#FFFFFF',
                            flex: 1,
                            borderRadius: '12px',
                            justifyContent: isSmallScreen ? 'center' : 'space-between',
                        }}
                    >
                        <Box display="flex" alignItems="center" sx={{ flex: 1, justifyContent: 'space-between' }}>
                            <Box textAlign={isSmallScreen ? "center" : "left"}>
                                <Typography variant="body2" sx={{ fontFamily: 'kanit', fontSize: 14, fontWeight: '500' }} color="#8E95A9">
                                    {stat.title}
                                </Typography>
                                {stat.values ? (
                                    <Grid container spacing={1}>
                                        {stat.values.map((item, index) => (
                                            <Grid item xs={6} key={index}>
                                                <Typography
                                                    sx={{ fontFamily: 'kanit', fontSize: 18, fontWeight: '500' }}
                                                    color='#1C2A53'
                                                    variant="body1"
                                                    textAlign="center"
                                                >
                                                    {item.label}: {item.value}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography
                                        sx={{ fontFamily: 'kanit', fontSize: 24, fontWeight: '500' }}
                                        color='#1C2A53'
                                        variant="h6"
                                    >
                                        {stat.value}
                                    </Typography>
                                )}
                            </Box>

                            <Box
                                style={{
                                    color: "#0063B2",
                                    fontSize: "2rem",
                                    marginLeft: isSmallScreen ? 0 : '16px'
                                }}
                            >
                                {stat.icon}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default StatisticsSection;
