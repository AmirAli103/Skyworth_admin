import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const IconWithText = ({ iconSrc, backgroundColor, text }) => {
    return (
        <Box 
            display="flex" 
            alignItems="center"
            sx={{ 
                backgroundColor: 'transparent', 
                padding: '8px', 
                borderRadius: '8px',
                 marginBottom:'20px'
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    width: 42, 
                    height: 42, 
                    backgroundColor, 
                    borderRadius: '50%',
                    background:backgroundColor ||'white',
                    marginRight: 1,
                }}
            >
                <Image src={iconSrc} alt="icon" width={24} height={24} />
            </Box>
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 600, fontFamily: 'kanit', color: '#05004E' }}>
                {text}
            </Typography>
        </Box>
    );
};

export default IconWithText;
