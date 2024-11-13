
import React from 'react';
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme, styled } from '@mui/material';
import Image from 'next/image';
import RegisterIcon from './../../public/Frame.png';
import Source from './../../public/Source.png';
import Size from './../../public/Size.png';
import Gender from './../../public/Gender.png';
import Type from './../../public/Type.png';

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

// Styled components
const StatsCardContainer = styled(Paper)(({ theme, isSmallScreen }) => ({
    width: 260,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: isSmallScreen ? 'column' : 'row',
    textAlign: isSmallScreen ? 'center' : 'left',
    gap: theme.spacing(1),
    borderRadius: '12px',
    boxSizing: 'border-box',
    boxShadow: '#EEEEEE80',
}));

const Title = styled(Typography)({
    fontFamily: 'kanit',
    fontSize: 14,
    fontWeight: 500,
    color: '#8E95A9',
});

const Value = styled(Typography)({
    fontFamily: 'kanit',
    fontSize: 24,
    fontWeight: 500,
    color: '#1C2A53',
});

const Label = styled(Typography)({
    fontFamily: 'kanit',
    fontSize: 14,
    fontWeight: 500,
    color: '#8E95A9',
});

const IconBox = styled(Box)(({ theme, isSmallScreen }) => ({
    color: "#0063B2",
    fontSize: "2rem",
    marginTop: isSmallScreen ? theme.spacing(2) : 0,
}));

const StatsGridContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
}));

const StatsCard = ({ stat, isSmallScreen }) => (
    <StatsCardContainer elevation={2} isSmallScreen={isSmallScreen}>
        <Box>
            <Title variant="body2">
                {stat.title}
            </Title>
            {stat.values ? (
                <Grid container spacing={1}>
                    {stat.values.map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <Value textAlign="center">
                                <Label>{item.label}:</Label> {item.value}
                            </Value>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Value>
                    {stat.value}
                </Value>
            )}
        </Box>
        <IconBox isSmallScreen={isSmallScreen}>
            {stat.icon}
        </IconBox>
    </StatsCardContainer>
);

const StatsGrid = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StatsGridContainer>
            {stats.map((stat, index) => (
                <StatsCard key={index} stat={stat} isSmallScreen={isSmallScreen} />
            ))}
        </StatsGridContainer>
    );
};

export default StatsGrid;
