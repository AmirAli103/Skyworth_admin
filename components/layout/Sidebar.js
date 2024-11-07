// components/Sidebar.js
import React from 'react';
import { List, ListItem, Divider, Typography } from '@mui/material';
import SidebarItem from './SidebarItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person'; // Import PersonIcon for "User" item
import { useRouter } from 'next/router';

const Sidebar = ({ onClose }) => {
  const router = useRouter();

  return (
    <div style={{ width: 300, backgroundColor: '#f4f4f4', position: 'fixed', height: '100%', zIndex: 1000 }}>
      <List sx={{ paddingTop: '0px' }}>
        <ListItem
          selected={router.pathname === '/dashboard'}
          sx={{ background: '#0063B2', height: '80px', fontFamily: 'Kanit' }}
          onClick={onClose}
        >
          <Typography sx={{ fontFamily: 'Kanit', fontWeight: '500', fontSize: '20px', color: 'white' }}>
            SKYWORTH Pakistan
          </Typography>
        </ListItem>
        <SidebarItem
          text="Dashboard"
          icon={<DashboardIcon />}
          path="/dashboard"
          onClose={onClose}
        />
        <SidebarItem
          text="User" // Updated from "Settings" to "User"
          icon={<PersonIcon />} // Changed icon to PersonIcon
          path="/user" // Updated path from "/settings" to "/user"
          onClose={onClose}
        />
      </List>
      <Divider />
    </div>
  );
};

export default Sidebar;
