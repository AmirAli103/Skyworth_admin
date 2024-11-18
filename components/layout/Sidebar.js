import React from 'react';
import { List, ListItem, Divider, Typography } from '@mui/material';
import SidebarItem from './SidebarItem';
import { useRouter } from 'next/router';
import Graph1 from './../../public/Graph1.png'
import GraphSelected from './../../public/GraphSelected.png'
import UsersSelected from './../../public/UsersSelected.png'
import Users from './../../public/Users.png'
const Sidebar = ({ onClose, userData }) => {
  const router = useRouter();

  return (
    <div style={{ width: 300, backgroundColor: '#f4f4f4', position: 'fixed', height: '100%', zIndex: 1000 }}>
      <List sx={{ paddingTop: '0px' }}>
        <ListItem
          selected={router.pathname === '/dashboard'}
          sx={{ background: '#0063B2', height: '80px', fontFamily: 'Kanit', justifyContent: 'center' }}
          onClick={onClose}
        >
          <Typography sx={{ fontFamily: 'Kanit', fontWeight: '500', fontSize: '20px', color: 'white' }}>
            SKYWORTH Pakistan
          </Typography>
        </ListItem>
        <SidebarItem
          text="Dashboard"
          selectImage={GraphSelected.src} 
          unselectedImage={Graph1.src}
          path="/dashboard"
          onClose={onClose}
        />
        {userData?.role === "Admin" && (
          <SidebarItem
            text="Users"
            selectImage={UsersSelected.src} 
            unselectedImage={Users?.src}
            path="/user"
            onClose={onClose}
          />
        )}
      </List>
      <Divider />
    </div>
  );
};

export default Sidebar;
