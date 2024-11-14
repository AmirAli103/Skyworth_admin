import React, { useRef, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconWithText from '../IconWithText';
import Filter from './../../public/Line.png'
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
const filtersData = [
  { label: 'Gender', value: '', options: ['Male', 'Female'] },
  { label: 'LED Size', value: '', options: ['32"', '40"', '50"', '60"'] },
  { label: 'LED Type', value: '', options: ['Slim', 'Standard'] },
  { label: 'Where', value: '', options: ['Option 1', 'Option 2'] },
];

const FilterBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollContainerRef = useRef(null);
  const [countryid, setCountryid] = useState(167);
  const [stateid, setstateid] = useState(null);
  const [filters, setFilters] = useState(filtersData);
  const [anchorEls, setAnchorEls] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(true);

  const handleMenuOpen = (event, filterIndex) => {
    setAnchorEls({ ...anchorEls, [filterIndex]: event.currentTarget });
  };

  const handleMenuClose = (filterIndex, selectedValue) => {
    const updatedFilters = filters.map((filter, index) =>
      index === filterIndex ? { ...filter, value: selectedValue } : filter
    );
    setFilters(updatedFilters);
    setAnchorEls({ ...anchorEls, [filterIndex]: null });

    if (selectedValue) {
      setIsAllSelected(false);
    } else if (updatedFilters.every((filter) => filter.value === '')) {
      setIsAllSelected(true);
    }
  };

  const handleSelectAll = () => {
    const resetFilters = filters.map((filter) => ({ ...filter, value: '' }));
    setFilters(resetFilters);
    setIsAllSelected(true);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{
      alignItems: 'center',
      p: 2,
      borderRadius: '8px',
      boxShadow: theme.shadows[1],
      backgroundColor: '#fff',
    }}>
      <Box sx={{ display: 'flex' }}>
        <IconWithText backgroundColor={"#EFF8FF"} iconSrc={Filter.src} text="Filters" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <IconButton onClick={scrollLeft} sx={{ mr: 1 }}>
          <ChevronLeftIcon />
        </IconButton>
        <Button
          onClick={handleSelectAll}
          variant={isAllSelected ? 'contained' : 'outlined'}
          color={isAllSelected ? 'primary' : 'default'}
          sx={{
            borderRadius: '24px',
            textTransform: 'none',
            fontWeight: 'bold',
            mr: 1,
            height: 35,
            alignSelf: 'center'
          }}
        >
          All
        </Button>

        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 2,
            // overflowX: 'auto',
            flexGrow: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <StateSelect
            countryid={countryid}
            onChange={(e) => { setstateid(e.id) }}
            style={{
              height: "34px", border: "0px solid #ccc", fontFamily: 'kanit', outline: 'none', boxShadow: 'none',
              '&:focus': {
                border: 'none',
                outline: 'none',
              }
            }}
            placeHolder="Select State"
          />
         {stateid!=null&& <CitySelect
                countryid={countryid}
                stateid={stateid}
                autoComplete="off"
                onChange={(e) => {
                  setValue("city", e?.name);
                }}
                style={{
                  height: "34px", border: "0px solid #ccc", fontFamily: 'kanit', outline: 'none', boxShadow: 'none',
                  '&:focus': {
                    border: 'none',
                    outline: 'none',
                  }
                }}
                placeHolder="Select City"
              />}
          {filters.map((filter, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={(event) => handleMenuOpen(event, index)}
                variant="outlined"
                sx={{
                  borderRadius: '24px',
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                }}
              >
                <Typography sx={{ mr: 1, color: 'grey.700' }}>{filter.label}</Typography>
                <Typography color="primary" fontWeight="bold">
                  {filter.value || 'None'}
                </Typography>
              </Button>

              <Menu
                anchorEl={anchorEls[index]}
                open={Boolean(anchorEls[index])}
                onClose={() => handleMenuClose(index, '')}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                {filter.options.map((option) => (
                  <MenuItem key={option} onClick={() => handleMenuClose(index, option)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))}
        </Box>

        {/* Right Scroll Button */}
        <IconButton onClick={scrollRight} sx={{ ml: 1 }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FilterBar;
