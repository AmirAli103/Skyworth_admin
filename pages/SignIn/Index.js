// pages/signIn.js
import React from 'react';
import { Box, Typography, Container, Grid, CircularProgress } from '@mui/material';
import CustomButton from '../../components/buttons/CustomButton';
import TextInputField from '../../components/InputField/TextInputField';
import signInStyles from './SignInStyle';
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

  return (
    <Container maxWidth={false} disableGutters sx={signInStyles.container}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Box sx={signInStyles.imageContainer} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={signInStyles.formContainer}>
            <Typography sx={{ ...signInStyles.title, textAlign: 'left',marginBottom:'0px' }}>
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
              {/* <RememberMeCheckbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
              /> */}
              <CustomButton type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
              </CustomButton>
            </Box>
            {/* <Typography sx={signInStyles.linkText}>
              Don’t have an account?{' '}
              <Link href="/signUp" passHref>
                <Typography component="span" sx={signInStyles.signUpLink}>
                  Sign Up
                </Typography>
              </Link>
            </Typography> */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
