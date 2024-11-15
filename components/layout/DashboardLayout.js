// components/layout/DashboardLayout.js
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, CssBaseline, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/router';
const drawerWidth = 300; // Sidebar width

const DashboardLayout = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user_data')); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router=useRouter();
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('skyworth_token');
    router.push('/')
    handleMenuClose();
  };
  return (
    <Box sx={{ display: 'flex',background:'#F7F7F7' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
       <Toolbar sx={{ height: '80px', background: '#0063B2', justifyContent: 'space-between' }}>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleSidebarToggle}
        sx={{ display: { sm: 'none' } }} // Hide on larger screens
      >
        <MenuIcon />
      </IconButton>
      <Typography sx={{ fontFamily: 'Kanit', fontWeight: '600', fontSize: { xs: "16px", md: '28px' } }}>
        Analytics Admin - Warranty Registration
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ color: 'white',fontFamily:'kanit' }}>
          {userData?.name?userData?.name:userData?.role} {/* Display user name */}
        </Typography>
        <IconButton
          color="inherit"
          sx={{height:"10px",width:"10px"}}
          onClick={handleMenuClick}
        >
          <ArrowDropDownIcon /> {/* Replace Avatar with dropdown icon */}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Sidebar onClose={handleDrawerClose}  userData={userData}/>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Sidebar onClose={handleDrawerClose} userData={userData}/>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` }, // Shift content to the right of the drawer
          mt: 8, // Offset for AppBar height
          background:'#F8F8F8'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
