import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {


  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone:Yup.string().required('Phone is required'),
    address:Yup.string().required('Address is required'),
    role:Yup.string().required('Role is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      role: ''
    },
    validationSchema: SignupSchema,
    // validationSchema:LoginSchema,
    onSubmit: async (values) => {
      console.log('Values of Form are', values);
      
      const { email, password } = values;
      try {

        
      } catch (err) {
        
      }
    },
  });

  
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Information
          </Typography>
            <FormikProvider value={formik}  onSubmit={handleSubmit}>
                <Form autoComplete="off">
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            required
                            fullWidth
                            name="cnic"
                            label="Cnic"
                            type="text"
                            id="cnic"
                            autoComplete="CNIC"
                            {...getFieldProps('cnic')}
                            error={Boolean(touched.cnic && errors.cnic)}
                            helperText={touched.cnic && errors.cnic}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="phoneNumber"
                            label="Phone"
                            type="text"
                            id="phoneNumber"
                            autoComplete="phoneNumber"
                            {...getFieldProps('phoneNumber')}
                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                            helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="postalAddress"
                            label="Postal Address"
                            type="address"
                            id="postalAddress"
                            autoComplete="postalAddress"
                            {...getFieldProps('postalAddress')}
                            error={Boolean(touched.postalAddress && errors.postalAddress)}
                            helperText={touched.postalAddress && errors.postalAddress}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="city"
                            label="city"
                            type="text"
                            id="city"
                            autoComplete="city"
                            {...getFieldProps('city')}
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                            />
                        </Grid>
                        </Grid>
                    </Box>
                </Form>
            </FormikProvider>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}