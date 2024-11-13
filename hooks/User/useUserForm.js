import { useState } from 'react';

const useUserForm = (initialUsers, setUsers) => {
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
    const updatedUsers = [...initialUsers];
    if (editIndex !== null) {
      updatedUsers[editIndex] = formData;
    } else {
      updatedUsers.push(formData);
    }
    setUsers(updatedUsers);
    handleClose();
  };

  return { open, handleOpen, handleClose, handleChange, handleSave, formData };
};

export default useUserForm;
