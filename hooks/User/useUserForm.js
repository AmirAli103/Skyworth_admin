import { useState } from 'react';
import { postRequestToken, updateUserStatus } from './../ApiHandler';

const useUserForm = (initialUsers, setUsers, fetchData) => {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '', status: '', id: '' });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleOpen = (user = null, index = null) => {
    setEditIndex(index);
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        mobile:user.mobile,
        status: true,
      });
    } else {
      setFormData({ name: '', email: '', mobile: '',  id: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setFormData({ name: '', email: '', mobile: '', id: '' });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editIndex !== null) {
        const updatedUsers = [...initialUsers];
        const updatedUser = { ...formData };
        updatedUsers[editIndex] = updatedUser;
        if (updatedUser.id) {
          await updateUserStatus(`auth/updateStatus/${updatedUser.id}`, {
            name:updatedUser?.name,
            status:updatedUser?.status,
            mobile:updatedUser?.mobile,
          });
        } else {
          console.error("User ID is missing during update");
        }

        setUsers(updatedUsers);
      } else {
        const response = await postRequestToken('auth/signup', formData);
        if (response) {
          await fetchData();
        } else {
          throw new Error(response.message || 'Failed to create user');
        }
      }
      await fetchData();
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return { open, handleOpen, handleClose, handleChange, handleSave, formData, editIndex, error, saving };
};

export default useUserForm;
