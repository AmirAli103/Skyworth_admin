import React from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/DriveFileRenameOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TextInputField from '../InputField/TextInputField';
import StatusSelectField from './StatusSelectField';
import useFetchUsers from '../../hooks/User/UseFetchUser';
import useUserForm from '../../hooks/User/useUserForm';

const UserTable = () => {
  const { users, setUsers, loading, error } = useFetchUsers();
  const { open, handleOpen, handleClose, handleChange, handleSave, formData } = useUserForm(users, setUsers);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, backgroundColor: '#f9f9f9' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h6" sx={{ color: 'black' }} fontWeight="bold">
            Users
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Here is a list of all Users
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#0063B2' }}>
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
                <TableCell>{user.mobile}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <FiberManualRecordIcon sx={{ fontSize: 12, color: user?.status == "Active" ? 'green' : 'red', mr: 1 }} />
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
        <DialogContent>
          <TextInputField label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextInputField label="Email" name="email" value={formData.email} onChange={handleChange} />
          <TextInputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
          <TextInputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
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
