import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';

const ConfirmLog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} className='create-task-dialog'>
            <Box className='container'>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    Are you sure you want to log out?
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} className='no-btn inputs'>No</Button>
                    <Button onClick={onConfirm} className='task-btn' autoFocus>Yes</Button>
                </DialogActions>
            </Box>

        </Dialog>
    );
};

export default ConfirmLog;
