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
    { label: 'Type', value: '', options: ['QLED', 'QLED MINI', "FHD/HD", "UHD"] },
    { label: 'advertisementSource', value: '', options: ["Television", "Billboard", "Facebook", "Instagram", "Youtube", "LinkedIn", "Dealer", "Search engines", "Customers testimonials", "Peer referral", "Others"] },
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
    const [city, setCity] = useState(null);
    const [filters, setFilters] = useState(filtersData);
    const [anchorEls, setAnchorEls] = useState({});
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
        // Handle province selection independently
        onFilterChange([{ label: 'province', value: state?.name }]);
    };

    const handleCitySelect = useCallback((selectedCity) => {
        setCity(selectedCity?.name);
        setIsAllSelected(false);
        onFilterChange([{ label: 'city', value: selectedCity?.name }]);
    }, [onFilterChange]);

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
        </Box>
    );
};

export default FilterBar;
