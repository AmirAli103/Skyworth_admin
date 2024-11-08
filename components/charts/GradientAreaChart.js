import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Paper } from '@mui/material';
import SectionTitle from './SectionTitle';

const GradientAreaChart = ({ data, title }) => {
    return (
        <Paper elevation={3} style={{ padding: "16px" }}>
            <SectionTitle title={title} />
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0063B2" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0063B2" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0063B2"
                        fill="url(#colorValue)"
                        dot={{ fill: "#0063B2", r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default GradientAreaChart;
