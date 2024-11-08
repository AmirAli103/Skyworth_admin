import React from 'react';
import { Typography } from '@mui/material';

const SectionTitle = ({ title }) => {
    return (
        <Typography
            variant="h6"
            style={{
                color: "#122C60",
                marginBottom: "16px",
                paddingLeft: "16px",
                fontWeight: 600
            }}
        >
            {title}
        </Typography>
    );
};

export default SectionTitle;
