import React, { useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent,
  DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/DriveFileRenameOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TextInputField from '../InputField/TextInputField';
import StatusSelectField from './StatusSelectField';

const initialUsers = [
  { name: 'Lindsey Stroud', email: 'lindsey.stroud@gmail.com', phone: '+92 300 0000000', status: 'Active' },
  { name: 'Sarah Brown', email: 'sarah.brown@gmail.com', phone: '+92 300 0000000', status: 'Deactivated' },
  // ... more users
];

const UserTable = () => {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'Active' });

  const handleOpen = (user = null, index = null) => {
    setEditIndex(index);
    setFormData(user || { name: '', email: '', phone: '', status: 'Active' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setFormData({ name: '', email: '', phone: '', status: 'Active' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUsers = [...users];
    if (editIndex !== null) {
      updatedUsers[editIndex] = formData;
    } else {
      updatedUsers.push(formData);
    }
    setUsers(updatedUsers);
    handleClose();
  };

  return (
    <Box sx={{ padding: {xs:2,md:4}, backgroundColor: '#f9f9f9' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ color: 'black' }} fontWeight="bold">
          Users
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1E88E5' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>User Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email Address</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <FiberManualRecordIcon sx={{ fontSize: 12, color: user.status === 'Active' ? 'green' : 'red', mr: 1 }} />
                    <Typography variant="body2">{user.status}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(user, index)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextInputField label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextInputField label="Email" name="email" value={formData.email} onChange={handleChange} />
          <TextInputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <StatusSelectField name="status" value={formData.status} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
