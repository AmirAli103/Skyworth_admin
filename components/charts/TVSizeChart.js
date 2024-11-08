import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Paper } from '@mui/material';
import SectionTitle from './SectionTitle';

const TVSizeDistributionChart = ({ data,title,barSize }) => {
    return (
        <Paper elevation={3} style={{ padding: "16px" }}>
             <SectionTitle title={title}/>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} barSize={barSize?barSize:10}>
                    <XAxis dataKey="size"  />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#0063B2" : "#8E95A9"} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default TVSizeDistributionChart;
