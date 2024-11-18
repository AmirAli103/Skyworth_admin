// components/SidebarItem.js
import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SidebarItem = ({ text, selectImage, unselectedImage, path, onClose }) => {
  const router = useRouter();
  const isSelected = router.pathname === path;

  return (
    <Link href={path} passHref>
      <Box sx={{ paddingLeft: '25px', paddingRight: '25px', marginTop: '20px' }}>
        <ListItem
          button
          selected={isSelected}
          sx={{
            backgroundColor: isSelected ? '#0063B2' : 'transparent',
            borderRadius: '16px',
            height: '60px',
            '&:hover': {
              backgroundColor: isSelected ? '#0063B2' : '#e0e0e0',
            },
          }}
          onClick={onClose}
        >
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <img
              src={isSelected ? selectImage : unselectedImage}
              alt={`${text} icon`}
              style={{ width: 24, height: 24 }}
            />
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              sx: {
                color: isSelected ? 'white' : '#737791',
                fontFamily: 'kanit',
                fontWeight: isSelected ? '600' : '400',
                fontSize: isSelected ? '18px' : '16px',
              },
            }}
          />
        </ListItem>
      </Box>
    </Link>
  );
};

export default SidebarItem;
