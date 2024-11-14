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
    { label: 'LED Size', value: '', options: ['32"', '40"', '50"', '60"'] },
    { label: 'LED Type', value: '', options: ['Slim', 'Standard'] },
    { label: 'Where', value: '', options: ['Option 1', 'Option 2'] },
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

const FilterBar = () => {
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
        setFilters((prevFilters) =>
            prevFilters.map((filter, index) =>
                index === filterIndex ? { ...filter, value: selectedValue } : filter
            )
        );
        setAnchorEls((prev) => ({ ...prev, [filterIndex]: null }));

        if (selectedValue) {
            setIsAllSelected(false);
        } else if (filters.every((filter) => filter.value === '')) {
            setIsAllSelected(true);
        }
    }, [filters]);

    const handleSelectAll = useCallback(() => {
        setFilters(filters.map((filter) => ({ ...filter, value: '' })));
        setStateid(null);
        setCity(null);
        setIsAllSelected(true);
    }, [filters]);

    const handleStateSelect = (state) => {
        setStateid(state?.id || null); // Set the state ID or null if no state is selected
        setCity(null); // Clear the city selection whenever a new state is chosen
        setIsAllSelected(false); // Unselect the "All" option
    };

    const handleCitySelect = useCallback((city) => {
        setCity(city?.name);
        setIsAllSelected(false);
    }, []);

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
                    key={stateid} // triggers re-render when stateid changes
                    countryid={countryid}
                    value={stateid}
                    onChange={(e) => handleStateSelect(e)}
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
