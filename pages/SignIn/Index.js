// pages/signIn.js
import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import CustomButton from '../../components/buttons/CustomButton';
import TextInputField from '../../components/InputField/TextInputField';
import signInStyles from './SignInStyle';
import useForm from '../../hooks/useForm'; // Import the custom hook

export default function SignIn() {
  const router = useRouter();
  const {
    formData,
    errors,
    rememberMe,
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
                name="email" // Ensure this matches formData key
                value={formData.email} // Bind to formData
                onChange={handleChange} // Ensure this is the correct handler
              />
              {errors.email && <Typography color="error">{errors.email}</Typography>}
              <TextInputField
                label="Password"
                type="password"
                name="password" // Ensure this matches formData key
                value={formData.password} // Bind to formData
                onChange={handleChange} // Ensure this is the correct handler
              />
              {errors.password && <Typography color="error">{errors.password}</Typography>}
              {/* <RememberMeCheckbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
              /> */}
              <CustomButton type="submit">Log In</CustomButton>
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
