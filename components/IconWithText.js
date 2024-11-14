import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs from 'dayjs';

const IconWithText = ({ iconSrc, backgroundColor, text, data }) => {
    const [tabValue, setTabValue] = useState(0);
    const [selectedDateRange, setSelectedDateRange] = useState([dayjs(null), dayjs(null)]); // Initialize as Dayjs objects

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleDownload = () => {
        if (!data || !Array.isArray(data)) return;
    
        const filteredData = data.filter(item => {
            const itemDate = dayjs(item.createdAt);
            return itemDate.isBetween(selectedDateRange[0], selectedDateRange[1], null, '[]');
        });
    
        if (filteredData.length === 0) {
            console.log('No data to download for the selected date range');
            return; // No data to download
        }
    
        console.log('Filtered Data:', filteredData); // Check the filtered data
    
        const csvData = convertToCSV(filteredData);
        downloadCSV(csvData);
    };
    
    
    const convertToCSV = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            console.warn('Data is empty or not an array');
            return ''; // Return empty string if data is not valid
        }
    
        const selectedFields = ['name', 'mobile', 'province', 'city', 'type', 'advertisementSource'];
    
        // Log the data for debugging
        console.log('Data received in convertToCSV:', data);
    
        // Create the headers from the selected fields
        const headers = selectedFields.join(',');
    
        // Extract the corresponding values for each entry in the data
        const rows = data.map((item, index) => {
            const row = selectedFields.map((field) => {
                const value = item[field] || ''; // Ensure it defaults to empty if not found
                return value;
            }).join(',');
    
            return row;
        });
    
        // Combine headers and rows to form the CSV content
        const csvContent = [headers, ...rows].join('\n');
        console.log('CSV Content:', csvContent); // Log the CSV content for debugging
    
        return csvContent;
    };
    
    
    const downloadCSV = (data) => {
        const csv = convertToCSV(data);
    
        // Create a blob and trigger a download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'user_data.csv';
        link.click();
    };
    

    const handleDateRangeChange = (newRange) => {
        const [startDate, endDate] = newRange;
        if (startDate && endDate && dayjs(startDate).isValid() && dayjs(endDate).isValid()) {
            setSelectedDateRange([dayjs(startDate), dayjs(endDate)]);
        } else {
            console.warn('Invalid date range selected');
        }
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

            {data && (
                <Box display="flex" flexDirection="row" gap={{xs:2,md:5}} alignItems="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            startText="Start Date"
                            endText="End Date"
                            value={selectedDateRange}
                            onChange={handleDateRangeChange}
                            slots={{ field: SingleInputDateRangeField }}
                            name="allowedRange"
                        />
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDownload}
                        disabled={!selectedDateRange[0] || !selectedDateRange[1]}
                        sx={{ borderRadius: '24px', textTransform: 'none', fontWeight: 'bold', marginTop: 2 }}
                    >
                        Download CSV
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default IconWithText;
