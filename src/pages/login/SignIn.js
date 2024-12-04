import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Paper, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const VisibilityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
    </svg>
  );

  const VisibilityOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
    </svg>
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      if (userData.name === name && userData.password === password) {
        toast.success('Signed in successfully', {
          style: { backgroundColor: 'green', color: 'white' },
        });
        navigate('/all-task', { state: { userData } });
      } else {
        toast.error('Invalid username or password', {
          style: { backgroundColor: 'red', color: 'white' },
        });
      }
    } else {
      toast.error('No user data found', {
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} md={6} className="login-bg">
        <Typography className='text-light text-center fontw700' variant='h4'>
          Sign In Your Task Management Application
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} component={Paper} elevation={3} className="form-container">
        <Box className="form-box">
          <Typography variant="h4" className='fontw700' >
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            <InputLabel >Name <span>*</span></InputLabel>

            <TextField
              placeholder='Enter Name'
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 2 }}
              required
            />
            <InputLabel >Password <span>*</span></InputLabel>
            <TextField
              placeholder="Enter Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
              sx={{ marginBottom: 2 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button className='task-btn' fullWidth type="submit">
              Sign In
            </Button>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={() => navigate('/signup')}
            >
              Create an Account
            </Button>
          </form>
        </Box>
      </Grid>

      <ToastContainer position="top-right" />
    </Grid>
  );
};

export default SignIn;
