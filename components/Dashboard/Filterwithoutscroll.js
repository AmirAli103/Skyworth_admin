import React, { useState, useCallback, memo } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography, Divider, useMediaQuery, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconWithText from '../IconWithText';
import Filter from './../../public/Line.png';
import {
    CitySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const filtersData = [
    { label: 'Gender', value: '', options: ['Male', 'Female'] },
    { label: 'Size', value: '', options: ["100 inches", "86 inches", "85 inches", "75 inches", "65 inches", "55 inches", "50 inches", "43 inches", "40 inches", "32 inches"] },
    { label: 'Type', value: '', options: ['QLED', 'QLED MINI', "UHD", "FHD"] },
    { label: 'advertisementSource', value: '', options: ["Television", "Billboard", "Facebook", "Instagram", "Youtube", "LinkedIn", "Dealer", "Search engines", "Customers testimonials", "Peer referral", "Others"] },
    { label: 'city', value: '', options: [] }, // Add city filter for dynamic selection
];

const MemoizedFilterButton = memo(({ filter, index, anchorEl, onOpen, onClose }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
            onClick={(event) => onOpen(event, index)}
            variant="outlined"
            sx={{
                borderRadius: '24px',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                color: filter.value ? 'primary' : 'grey.700',
                fontWeight: filter.value ? 'bold' : 'normal',
            }}
        >
            <Typography sx={{ mr: 1 }}>{filter.label}</Typography>
            <Typography fontWeight="bold">
                {filter.value || 'None'}
            </Typography>
            <ArrowDropDownIcon sx={{ ml: 1, color: 'grey.500' }} />
        </Button>

        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => onClose(index, '')}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            {filter.options.map((option) => (
                <MenuItem key={option} onClick={() => onClose(index, option)}>
                    {option}
                </MenuItem>
            ))}
        </Menu>
    </Box>
));

const FilterBar = ({ onFilterChange }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [countryid] = useState(167);
    const [stateid, setStateid] = useState(null);
    const [filters, setFilters] = useState(filtersData);
    const [anchorEls, setAnchorEls] = useState({});
    const [city, setCity] = useState(null);
    const [isAllSelected, setIsAllSelected] = useState(true);

    const handleMenuOpen = useCallback((event, filterIndex) => {
        setAnchorEls((prev) => ({ ...prev, [filterIndex]: event.currentTarget }));
    }, []);

    const handleMenuClose = useCallback((filterIndex, selectedValue) => {
        const updatedFilters = filters.map((filter, index) =>
            index === filterIndex ? { ...filter, value: selectedValue } : filter
        );
        setFilters(updatedFilters);
        setAnchorEls((prev) => ({ ...prev, [filterIndex]: null }));

        if (selectedValue) {
            setIsAllSelected(false);
        } else if (updatedFilters.every((filter) => filter.value === '')) {
            setIsAllSelected(true);
        }
        onFilterChange(updatedFilters);
    }, [filters, onFilterChange]);

    const handleSelectAll = useCallback(() => {
        const resetFilters = filters.map((filter) => ({ ...filter, value: '' }));
        setFilters(resetFilters);
        setStateid(null);
        setCity(null);
        setIsAllSelected(true);
        onFilterChange(resetFilters);
    }, [filters, onFilterChange]);

    const handleStateSelect = (state) => {
        setStateid(state?.id || null);
        setCity(null);
        setIsAllSelected(false);
    
        const updatedFilters = filters.map((filter) =>
            filter.label === 'State' ? { ...filter, value: state?.name?.toLowerCase() } : filter
        );
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleCitySelect = useCallback((city) => {
       
        setCity(city?.name);
        setIsAllSelected(false);

        const updatedFilters = filters.map((filter) =>
            filter.label === 'city' ? { ...filter, value: city?.name } : filter
        );
        setFilters(updatedFilters);
        onFilterChange(updatedFilters); // Pass updated city filter to parent
    }, [filters, onFilterChange]);

    const getLEDSizeComparison = () => {
        const ledSizeFilter = filters.find((filter) => filter.label === 'LED Size');
        return ledSizeFilter ? ledSizeFilter.value : null;
    };

    const getLEDTypeComparison = () => {
        const ledTypeFilter = filters.find((filter) => filter.label === 'LED Type');
        return ledTypeFilter ? ledTypeFilter.value : null;
    };

    const compareLEDSizeAndType = () => {
        const ledSize = getLEDSizeComparison();
        const ledType = getLEDTypeComparison();

        if (ledSize && ledType) {
            if (ledSize === '100 inches' && ledType === 'QLED') {
                return '100-inch QLED selected!';
            } else if (ledSize === '50 inches' && ledType === 'UHD') {
                return '50-inch UHD selected!';
            } else {
                return 'Different LED Size and Type selected.';
            }
        }
        return null;
    };

    return (
        <Box sx={{
            alignItems: 'center',
            p: 2,
            borderRadius: '8px',
            boxShadow: theme.shadows[1],
            backgroundColor: '#fff',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconWithText backgroundColor={"#EFF8FF"} iconSrc={Filter.src} text="Filters" />
                <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 28 }} />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                    onClick={handleSelectAll}
                    variant={isAllSelected ? 'contained' : 'outlined'}
                    color={isAllSelected ? 'primary' : 'default'}
                    sx={{
                        borderRadius: '24px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: 35,
                        alignSelf: 'center'
                    }}
                >
                    All
                </Button>
                <StateSelect
                    countryid={countryid}
                    onChange={handleStateSelect}
                    placeHolder="Select State"
                    style={{
                        height: "34px", border: "0px solid #ccc", fontFamily: 'kanit', outline: 'none', boxShadow: 'none',
                        '&:focus': { border: 'none', outline: 'none' }
                    }}
                />
                {stateid != null && (
                    <CitySelect
                        countryid={countryid}
                        stateid={stateid}
                        autoComplete="off"
                        onChange={handleCitySelect}
                        style={{
                            height: "34px", border: "0px solid #ccc", fontFamily: 'kanit', outline: 'none', boxShadow: 'none',
                            '&:focus': { border: 'none', outline: 'none' }
                        }}
                        placeHolder="Select City"
                    />
                )}

                {filters.map((filter, index) => (
                    <MemoizedFilterButton
                        key={index}
                        filter={filter}
                        index={index}
                        anchorEl={anchorEls[index]}
                        onOpen={handleMenuOpen}
                        onClose={handleMenuClose}
                    />
                ))}
            </Box>

            {/* Display comparison results */}
            {compareLEDSizeAndType() && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary">{compareLEDSizeAndType()}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default FilterBar;
