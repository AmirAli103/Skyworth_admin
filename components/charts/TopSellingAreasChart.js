import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Paper } from '@mui/material';
import SectionTitle from './SectionTitle';

const TopSellingAreasChart = ({ data, title }) => {
    return (
        <Paper elevation={3} style={{ padding: "16px 16px 16px 0px" }}>
            <SectionTitle title={title}/>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 0,  bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#555", fontSize: 12 }} />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index % 2 === 1 ? "#8E95A9" : "#0063B2"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default TopSellingAreasChart;
