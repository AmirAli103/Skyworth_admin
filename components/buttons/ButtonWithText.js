import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';

const IconButtonWithText = ({ iconSrc, text, onClick, color = 'primary' }) => (
    <Box display="flex" alignItems="center" gap={1} onClick={onClick} sx={{ cursor: 'pointer', border: '1px solid #D9D9D9', padding: iconSrc?"0px 10px":'4px 10px', borderRadius: '5px', backgroundColor: 'white' }}>
        <Typography variant="body1" sx={{ fontWeight: '400', fontFamily: 'kanit', color: '#1C2A53' }}>
            {text}
        </Typography>
        {iconSrc&&<IconButton color={color}>
            <Image src={iconSrc} alt="icon" width={16} height={16} />
        </IconButton>}
    </Box>
);

export default IconButtonWithText;