import React, { useCallback, useState } from 'react';
import { Box, Button, Divider, useMediaQuery, useTheme } from '@mui/material';
import IconWithText from '../IconWithText';
import Filter from './Filter';
import FilterImage from './../../public/Line.png';
import { CitySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const FiltersContainer = ({ onFilterChange }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [countryid] = useState(167);
    const [stateid, setStateid] = useState(null);
    const [city, setCity] = useState(null);
    const [filters, setFilters] = useState({
        Gender: '',
        Size: '',
        Type: '',
        advertisementSource: '',
    });
    const [isAllSelected, setIsAllSelected] = useState(true);

    const handleFilterChange = (label, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [label]: value };
            console.log(updatedFilters)
            onFilterChange(updatedFilters); // Propagate the updated filters to the parent
            return updatedFilters;
        });
    };

    const handleSelectAll = useCallback(() => {
        const resetFilters = {
            Gender: '',
            Size: '',
            Type: '',
            advertisementSource: '',
        };
        setFilters(resetFilters);
        window.location.reload();
        setStateid(null);
        setCity(null);
        setIsAllSelected(true);
        onFilterChange(resetFilters);

    }, [onFilterChange]);


    const handleStateSelect = (state) => {
        console.log(state?.name)
        setStateid(state?.id);
        setCity(null);
        setIsAllSelected(false);
        handleFilterChange('province', state?.name)
    };

    const handleCitySelect = (city) => {
        setCity(city);
        setIsAllSelected(false);
        handleFilterChange('city', city?.name); // Update filters with selected city
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
                <IconWithText backgroundColor={"#EFF8FF"} iconSrc={FilterImage.src} text="Filters" />
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
                <Filter
                    label="Gender"
                    options={['Male', 'Female']}
                    value={filters.Gender}
                    onChange={handleFilterChange}
                />
                <Filter
                    label="Size"
                    options={[
                        '100 inches', '86 inches', '85 inches', '75 inches', '65 inches',
                        '55 inches', '50 inches', '43 inches', '40 inches', '32 inches'
                    ]}
                    value={filters.Size}
                    onChange={handleFilterChange}
                />
                <Filter
                    label="Type"
                    options={['QLED', 'QLED MINI', 'FHD/HD', 'UHD']}
                    value={filters.Type}
                    onChange={handleFilterChange}
                />
                <Filter
                    label="advertisementSource"
                    options={[
                        'Television', 'Billboard', 'Facebook', 'Instagram', 'Youtube',
                        'LinkedIn', 'Dealer', 'Search engines', 'Customers testimonials',
                        'Peer referral', 'Others'
                    ]}
                    value={filters.advertisementSource}
                    onChange={handleFilterChange}
                />
            </Box>
        </Box>
    );
};

export default FiltersContainer;
