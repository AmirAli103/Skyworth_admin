import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Paper } from '@mui/material';
import SectionTitle from './SectionTitle';

const LEDTVSalesChart = ({ data, title }) => {
    return (
        <Paper elevation={3} style={{ padding: "16px 16px 16px 0px" }}>
          <SectionTitle title={title}/>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={data} barSize={10} margin={{ left: 0, right: 0 }}>
                    <XAxis type="number" />
                    <YAxis 
                        dataKey="type" 
                        type="category" 
                        width={100}
                        tick={{ fill: "#555", fontSize: 14 }} 
                    />
                    <Tooltip />
                    <Bar dataKey="sales" radius={[0, 10, 10, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index % 2 === 0 ? "#0063B2" : "#8E95A9"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};


export default LEDTVSalesChart;
