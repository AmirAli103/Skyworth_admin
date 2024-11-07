// hooks/useForm.js
import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
    const router=useRouter()
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setFormData((prevData) => ({ ...prevData, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validate = () => {
    let valid = true;
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      valid = false;
      errors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      valid = false;
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      valid = false;
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      valid = false;
      errors.password = 'Password must be at least 6 characters';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (rememberMe) {
        localStorage.setItem('savedEmail', formData.email);
      } else {
        localStorage.removeItem('savedEmail');
      }
      // Replace this line with your login logic
      console.log('Logging in with:', formData);
      router.push('/dashboard');
    }
  };

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value); // Log input name and value
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return {
    formData,
    errors,
    rememberMe,
    handleChange,
    handleRememberMeChange,
    handleSubmit,
  };
};

export default useForm;
