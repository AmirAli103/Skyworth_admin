import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { postRequest } from './ApiHandler';

const useForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading,setLoading]=useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      if (rememberMe) {
        localStorage.setItem('savedEmail', formData.email);
      } else {
        localStorage.removeItem('savedEmail');
      }
      try {
        setLoading(true);
        const response = await postRequest('auth/signin', formData);
        
        if (response.access_token) {
          localStorage.setItem('skyworth_token', response.access_token);
          localStorage.setItem('user_data', JSON.stringify(response));
          setLoading(false);
          router.push('/dashboard');
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: response.message || 'Login failed. Please try again.',
          }));
        }
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.message || 'An error occurred. Please try again.',
        }));
      }
      setLoading(false);
    }
  };
  

  const handleChange = (event) => {
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
    loading,
    handleChange,
    handleRememberMeChange,
    handleSubmit,
  };
};

export default useForm;
