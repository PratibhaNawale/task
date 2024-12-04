import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConfirmLog from '../delete-popup/ConfirmLog';

const Navbar = ({ selectedFilter, onFilterChange }) => {
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('userData'));
    const userName = userData ? userData.name : '';
    const userEmail = userData ? userData.email : '';
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false); // State to control the dialog visibility

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setDialogOpen(true);
        handleClose();
    };

    const handleLogout = () => {
        navigate('/signin');
        setDialogOpen(false);
    };

    const handleFilterChange = (filter) => {
        onFilterChange(filter);
        navigate(`/${filter}`);
    };

    return (
        <AppBar position="static" className="navbar-bg">
            <Toolbar className="d-flex justify-content-between align-items-center py-2 mt-1">
                <Typography className="font18 fw-bold">
                    {userName && (
                        <span className='font18 fw-bold'>
                            Welcome, {userName.charAt(0).toUpperCase() + userName.slice(1)}
                        </span>
                    )} In Your
                    Task Management Application
                </Typography>

                <Box className="d-flex gap-3 align-items-center">
                    <Box className="d-flex gap-3">
                        <Typography
                            className={`font18 filter-option mt-2 ${selectedFilter === 'all-task' ? 'active-filter' : ''}`}
                            onClick={() => handleFilterChange('all-task')}
                        >
                            All Tasks
                        </Typography>
                        <Typography
                            className={`font18 filter-option mt-2 ${selectedFilter === 'pending' ? 'active-filter' : ''}`}
                            onClick={() => handleFilterChange('pending')}
                        >
                            Pending Tasks
                        </Typography>
                        <Typography
                            className={`font18 filter-option mt-2 ${selectedFilter === 'completed' ? 'active-filter' : ''}`}
                            onClick={() => handleFilterChange('completed')}
                        >
                            Completed Tasks
                        </Typography>
                        <Box display="flex" alignItems="center">
                            {userName && userEmail && (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Avatar
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            bgcolor: '#00796b',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleClick}
                                    >
                                        {userName[0]}
                                    </Avatar>
                                    <Box textAlign="left">
                                        <Typography className="font18">{userName.charAt(0).toUpperCase() + userName.slice(1)}</Typography>
                                    </Box>
                                </Box>
                            )}

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogoutClick}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h264v72H216v528h264v72H216Zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168Z" /></svg> Logout </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>

            <ConfirmLog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleLogout}
            />
        </AppBar>
    );
};

export default Navbar;
