// pages/signIn.js
import React from 'react';
import { Box, Typography, Container, Grid, CircularProgress } from '@mui/material';
import CustomButton from '../../components/buttons/CustomButton';
import TextInputField from '../../components/InputField/TextInputField';
import useForm from '../../hooks/useForm';

export default function SignIn() {
  const {
    formData,
    errors,
    rememberMe,
    loading,
    handleChange,
    handleRememberMeChange,
    handleSubmit,
  } = useForm();

  const signInStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex', // Use flexbox to align items
    },
    imageContainer: {
      backgroundImage: 'url("/signIn.png")',
      backgroundSize: 'cover', // Change to cover to ensure full coverage
      backgroundPosition: 'center',
      minHeight: { xs: '50vh', md: '100vh' },
      width: '100%', // Adjust the width to 50% for left side
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Centers items vertically
      alignItems: { xs: 'baseline', md: 'baseline' }, // Centers items horizontally
      padding: 4,
      width: { xs: '100%', md: '80%' }, // Adjust the width to 50% for right side
    },
    title: {
      color: '#0063B2',
      fontFamily: "'kanit'",
      fontSize: { xs: '40px', md: '64px' },
      fontWeight: 300,
    },
    title2: {
      color: '#0063B2',
      fontFamily: "'kanit'",
      fontSize: { xs: '40px', md: '64px' },
      fontWeight: 500,
    },
    form: {
      width: '100%',
      maxWidth: { xs: '100%', md: '80%' },
      alignItems: 'baseline',
      mt: 3,
    },
    checkboxContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      mt: 2,
    },
    linkText: {
      mt: 2,
      color: 'black',
      fontFamily: 'kanit',
      textAlign: 'center',
    },
    signUpLink: {
      color: '#FFD700',
      cursor: 'pointer',
    },
  };

  return (
    <Container maxWidth={false} disableGutters sx={signInStyles.container}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Box sx={signInStyles.imageContainer} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={signInStyles.formContainer}>
            <Typography sx={{ ...signInStyles.title, textAlign: 'left', marginBottom: '0px' }}>
              Hello,
            </Typography>
            <Typography sx={{ ...signInStyles.title2, textAlign: 'left' }}>
              Welcome
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={signInStyles.form}>
              <TextInputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <Typography color="error">{errors.email}</Typography>}
              <TextInputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <Typography color="error">{errors.password}</Typography>}
              <CustomButton type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
              </CustomButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
