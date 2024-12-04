import React, { useState, useEffect } from 'react';
import {
    Dialog,
    Box,
    Typography,
    Button,
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Grid,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import AddCategory from '../add-category/AddCategory';

const CreateTask = ({ open, onClose, onAddTask, task, userData }) => {
    const [status, setStatus] = useState('Pending');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('High');
    const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping']);
    const [isAddCategoryOpen, setAddCategoryOpen] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setCategory(task.category);
            setPriority(task.priority || 'High');
            setStartDate(new Date(task.startDate));
            setEndDate(new Date(task.endDate));
        } else {
            setTitle('');
            setDescription('');
            setStatus('Pending');
            setCategory('');
            setPriority('High');
            setStartDate(null);
            setEndDate(null);
        }
    }, [task]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (date) {
            setErrors((prevErrors) => ({ ...prevErrors, startDate: '' }));
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (date) {
            setErrors((prevErrors) => ({ ...prevErrors, endDate: '' }));
        }
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        if (value === '' || value.trim().length > 0) {
            setDescription(value);
            if (value.trim()) {
                setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
            }
        }
    };

    const handleTitleChange = (event) => {
        const value = event.target.value;
        if (value === '' || value.trim().length > 0) {
            setTitle(value);
            if (value.trim()) {
                setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
            }
        }
    };
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        if (selectedCategory) {
            setErrors((prevErrors) => ({ ...prevErrors, category: '' }));
        }
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };
    const validateInputs = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!startDate) {
            newErrors.startDate = 'Start date is required';
        }
        if (!endDate) {
            newErrors.endDate = 'End date is required';
        }
        if (!category) {
            newErrors.category = 'Please select a category';
        }
        return newErrors;
    };

    const handleSaveTask = () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the validation errors.', {
                style: { backgroundColor: 'red', color: 'white' },
            });
            return;
        }


        const newTask = {
            id: task?.id || Math.random(),
            userId: userData?.userId,
            status,
            title,
            description,
            category,
            priority,
            startDate: startDate ? startDate.toLocaleDateString() : '',
            endDate: endDate ? endDate.toLocaleDateString() : '',
        };

        onAddTask(newTask);
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setCategory('');
        setPriority('High');
        setStartDate(null);
        setEndDate(null);
        setErrors({});
        toast.success(task ? 'Task updated successfully!' : 'Task created successfully!', {
            style: { backgroundColor: 'green', color: 'white' },
        });
        onClose();
    };
    const handleClose = () => {
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setCategory('');
        setPriority('High');
        setStartDate(null);
        setEndDate(null);
        setErrors({});
        onClose();

    };

    const handleAddCategory = (newCategory) => {
        if (!categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
        } else {
            toast.error('Category already exists!', {
                style: { backgroundColor: 'red', color: 'white' },
            });
        }
    };


    return (
        <>
            <Dialog open={open} className="create-task-dialog set-width ">
                <Box className="container">
                    <Box className="header">
                        <Typography variant="h6">{task ? 'Edit Task' : 'Create Task'}</Typography>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#5f6368"
                            onClick={handleClose}
                            style={{ cursor: 'pointer' }}>
                            <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box className="input-field">
                                <InputLabel className='labels'>Title <span>*</span></InputLabel>
                                <FormControl fullWidth error={!!errors.title}>
                                    <TextField
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder="Enter task title"
                                        fullWidth
                                        className="input-field-input inputs"
                                        InputProps={{
                                            classes: {
                                                input: 'textfield-input',
                                            },
                                        }}
                                    />
                                    {errors.title && <Typography className='validation'>{errors.title}</Typography>}
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box className="input-field">
                                <InputLabel className='labels'>Description <span>*</span></InputLabel>
                                <FormControl fullWidth error={!!errors.description}>
                                    <TextField
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        placeholder="Enter task description"
                                        fullWidth
                                        className="input-field-input inputs"
                                        InputProps={{
                                            classes: {
                                                input: 'textfield-input',
                                            },
                                        }}
                                    />
                                    {errors.description && <Typography className='validation'>{errors.description}</Typography>}
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box className="input-field">
                                <InputLabel className='labels'>Status</InputLabel>
                                <FormControl fullWidth>
                                    <Select value={status} onChange={handleStatusChange} className="input-field-input inputs">
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Ongoing">Ongoing</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box className="input-field">
                                <InputLabel className='labels'>Start Date <span>*</span></InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker

                                        inputFormat="MM/dd/yyyy"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        className='textfield-input inputs'
                                    />
                                    {errors.startDate && <Typography className='validation'>{errors.startDate}</Typography>}
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box className="input-field">
                                <InputLabel className='labels'>End Date <span>*</span></InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        inputFormat="MM/dd/yyyy"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        className='inputs'
                                    />

                                    {errors.endDate && <Typography className='validation'>{errors.endDate}</Typography>}
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box className="input-field">
                                <Box className='d-flex justify-content-between'>
                                    <InputLabel className='labels'>Category<span>*</span></InputLabel>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="18px"
                                        viewBox="0 -960 960 960"
                                        width="18px"
                                        fill="#5f6368"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setAddCategoryOpen(true)}
                                    >
                                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                    </svg>
                                </Box>


                                <FormControl fullWidth >
                                    <Select
                                        value={category}
                                        onChange={handleCategoryChange}
                                        className="input-field-input inputs"
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            Select Category
                                        </MenuItem>
                                        {categories.map((cat) => (
                                            <MenuItem key={cat} value={cat}>
                                                {cat}
                                            </MenuItem>

                                        ))}
                                    </Select>
                                    {errors.category && <Typography className="validation">{errors.category}</Typography>}
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box className="input-field">
                                <InputLabel className='labels'>Priority<span>*</span></InputLabel>
                                <FormControl fullWidth error={!!errors.priority}>
                                    <Select value={priority} onChange={handlePriorityChange} className="input-field-input labels inputs">
                                        <MenuItem value="High">High</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="Low">Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box className='button-container' >
                        <Button onClick={handleSaveTask} className="task-btn font14">
                            {task ? 'Update Task' : 'Save Task'}
                        </Button>
                    </Box>

                </Box>
            </Dialog>
            <AddCategory
                open={isAddCategoryOpen}
                onClose={() => setAddCategoryOpen(false)}
                onAddCategory={handleAddCategory}
            />
            <ToastContainer position="top-right" />
        </>
    );
};

export default CreateTask;
