import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, IconButton } from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
const IconWithText = ({ iconSrc, backgroundColor, text, data, onDateRangeChange,DateRangeShow }) => {
    const [selectedDateRange, setSelectedDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    const [dateRangeDialogOpen, setDateRangeDialogOpen] = useState(false);

    const handleOpenDateRangeDialog = () => {
        setDateRangeDialogOpen(true);
    };

    const handleCloseDateRangeDialog = () => {
        setDateRangeDialogOpen(false);
        console.log(selectedDateRange[0].startDate, selectedDateRange[0].endDate);
        onDateRangeChange(selectedDateRange[0].startDate, selectedDateRange[0].endDate);
    };
    

    const handleDateRangeChange = (item) => {
        setSelectedDateRange([item.selection]);
    };

    const handleDownload = () => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.log('No data to download');
            return;
        }

        const csvData = convertToCSV(data);
        downloadCSV(csvData);
    };

    const convertToCSV = (data) => {
        const selectedFields = ['name', 'mobile', 'province', 'city', 'type', 'advertisementSource'];
        const headers = selectedFields.join(',');

        const rows = data.map((item) => selectedFields.map((field) => item[field] || '').join(','));
        return [headers, ...rows].join('\n');
    };

    const downloadCSV = (csv) => {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'user_data.csv';
        link.click();
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{
                backgroundColor: 'transparent',
                padding: '8px',
                borderRadius: '8px',
                marginBottom: '20px',
            }}
        >
            <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 42,
                        height: 42,
                        backgroundColor: backgroundColor || 'white',
                        borderRadius: '50%',
                        marginRight: 1,
                    }}
                >
                    <Image src={iconSrc} alt="icon" width={24} height={24} />
                </Box>
                <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 600, fontFamily: 'kanit', color: '#05004E' }}>
                    {text}
                </Typography>
            </Box>

            {DateRangeShow && (
                <Box display="flex" alignItems="center" gap={2}>
                    <Button variant="contained" color="primary" onClick={handleOpenDateRangeDialog} sx={{ borderRadius: '24px', fontWeight: 'bold' }}>
                        Select Date Range
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleDownload} sx={{ borderRadius: '24px', fontWeight: 'bold' }}>
                        Download CSV
                    </Button>
                </Box>
            )}

            <Dialog open={dateRangeDialogOpen} onClose={handleCloseDateRangeDialog}>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding:"30px 20px", position: 'relative' }}>
                    <IconButton aria-label="close" onClick={() => setDateRangeDialogOpen(false)} sx={{ position: 'absolute', top: 1, right: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <DateRange
                        onChange={handleDateRangeChange}
                        months={2}
                        maxDate={new Date()}
                        ranges={selectedDateRange}
                        direction="horizontal"
                        rangeColors={['#0063B2', 'transparent', '#0063B2']}
                    />
                    <Button
                        variant="contained"
                        onClick={handleCloseDateRangeDialog}
                        sx={{ mt: 2, backgroundColor: '#0063B2', width: 100, }}
                    >
                        Confirm
                    </Button>
                </Box>
            </Dialog>
        </Box>
    );
};

export default IconWithText;
