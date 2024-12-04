import React, { useState } from 'react';
import {
    Dialog,
    Box,
    Typography,
    Button,
    TextField,
    FormControl,
} from '@mui/material';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const AddCategory = ({ open, onClose, onAddCategory }) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (!newCategory.trim()) {
            toast.error('Category name is required', {
                style: { backgroundColor: 'red', color: 'white' },
            });
            return;
        }
        onAddCategory(newCategory);
        setNewCategory('');
        toast.success('Category added successfully!', {
            style: { backgroundColor: 'green', color: 'white' },
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} className='create-task-dialog'>
            <Box padding={3} width={400} className='container'>
                <Typography variant="h6" marginBottom={2} className='labels'>
                    Add Category
                </Typography>
                <FormControl fullWidth>
                    <TextField
                    className='inputs'
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category name"
                        fullWidth
                    />
                </FormControl>
                <Box className='button-container'>
                    <Button onClick={onClose} className='no-btn inputs'>
                        Cancel
                    </Button>
                    <Button className='task-btn' onClick={handleAddCategory}>
                        Add
                    </Button>
                </Box>
            </Box>
            <ToastContainer position="top-right" />
        </Dialog>
    );
};

export default AddCategory;
