import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Dropdown, Button, ProgressBar } from 'react-bootstrap';
import CreateTask from '../../component/create-task/CreateTask';
import { TextField, InputAdornment, Typography, Box, Checkbox } from '@mui/material';
import noData from '../../assets/no-data.jpg'
import ConfirmDialog from '../../component/delete-popup/ConfirmDialog';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from '../../utils/LocalStorage';
import Tooltip from '@mui/material/Tooltip';
import AddSubTask from '../../component/sub-task/AddSubTask';
const TodoList = ({ selectedFilter }) => {
    const [allTasks, setAllTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openCreateTask, setOpenCreateTask] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [subTasks, setSubTasks] = useState([]);
    const key = 'tasks';
    const [selectedCategory, setSelectedCategory] = useState('Select Category');
    const [selectedPriority, setSelectedPriority] = useState('Select Priority');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [cardId, setCardId] = useState();
    const location = useLocation();
    const userData = location.state?.userData;

    const handleSvgClick = (id) => {
        setIsDialogOpen(true);
        setCardId(id?.id)

    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleSelectPriority = (priority) => {
        setSelectedPriority(priority);
    };

    const handleClearInput = () => {
        setSearchQuery("");
    };

    const handleCreateTaskOpen = () => {
        setIsEditing(false);
        setSelectedTask(null);
        setOpenCreateTask(true);
    };

    const handleCreateTaskClose = () => {
        setOpenCreateTask(false);
    };

    const handleAddTask = (newTask) => {
        if (!userData?.userId) {
            console.error("No userId available in userData");
            return;
        }

        if (isEditing) {
            setAllTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === newTask.id && task.userId === userData.userId
                        ? { ...newTask, userId: userData.userId }
                        : task
                )
            );
        } else {
            setAllTasks((prevTasks) => {
                if (Array.isArray(prevTasks)) {
                    return [...prevTasks, { ...newTask, userId: userData.userId }];
                }
                return [{ ...newTask, userId: userData.userId }];
            });
        }

        setOpenCreateTask(false);
    };


    useEffect(() => {
        if (userData?.userId) {
            const filteredTasks = allTasks.filter(task => task.userId === userData.userId);
            setAllTasks(filteredTasks);
        }
    }, [userData, allTasks]);
    const handleDeleteTask = (taskToDelete) => {
        setSelectedTask(taskToDelete);
        setShowConfirmDialog(true);
    };

    const confirmDeleteTask = () => {
        setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
        setSelectedTask(null);
        setShowConfirmDialog(false);
    };
    const cancelDeleteTask = () => {
        setShowConfirmDialog(false);
    };
    const handleUpdateTaskStatus = (status, task) => {
        setAllTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.id === task.id ? { ...t, status } : t
            )
        );
        setSelectedTask(null);
    };

    const handleEditTask = (task) => {
        setIsEditing(true);
        setSelectedTask(task);
        setOpenCreateTask(true);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const validTasks = Array.isArray(allTasks) ? allTasks : [];

        const filtered = validTasks.filter((task) => {
            const matchesCategory =
                selectedCategory === "Select Category" || task.category === selectedCategory;
            const matchesPriority =
                selectedPriority === "Select Priority" || task.priority === selectedPriority;
            const matchesSearch =
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter =
                selectedFilter === "all-task" || task.status.toLowerCase() === selectedFilter;

            return matchesCategory && matchesPriority && matchesSearch && matchesFilter;
        });

        setFilteredTasks(filtered);
    }, [allTasks, selectedCategory, selectedPriority, searchQuery, selectedFilter]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'green';
            case 'Ongoing':
                return '#39ABDF';
            case 'Pending':
                return '#c2c204';
            default:
                return 'gray';
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return '#B22222';
            case 'Medium':
                return '#FF8C00';
            case 'Low':
                return '#006400'

        }
    }


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    const handleCheckboxChange = (task) => {
        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        handleUpdateTaskStatus(newStatus, task);
    };
    useEffect(() => {
        const loadedTasks = loadTasksFromLocalStorage(key);
        setAllTasks(loadedTasks);
    }, []);

    useEffect(() => {
        if (allTasks.length > 0) {
            saveTasksToLocalStorage(key, allTasks);
        }
    }, [allTasks]);
    const handleAddSubTask = (newSubTask) => {
        setSubTasks([...subTasks, newSubTask]);
    };
    const isOverdue = (task) => {
        if (!task || !task.endDate) return false; // Ensure task and endDate are defined

        const currentDate = new Date();
        const endDate = new Date(task.endDate);

        // Set the time of current date to 00:00:00 to compare only the date part
        currentDate.setHours(0, 0, 0, 0);

        // If the endDate is invalid, return false
        if (isNaN(endDate.getTime())) {
            console.error("Invalid end date:", task.endDate);
            return false;
        }

        // If the end date is today or in the past and the task is not completed
        return (endDate <= currentDate && task.status !== "Completed");
    };
    return (
        <Box className="p-5">
            <Box className="d-flex justify-content-between align-items-center mb-4">
                <Box>
                    <Typography className='font18 fontw700'>Daily Task Management</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        className='inputs'
                        sx={{
                            height: '40px',
                            '& .MuiInputBase-root': {
                                height: '40px',
                            },
                            width: 'auto',
                            maxWidth: 400,
                        }}
                        placeholder="Search Task"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368">
                                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                                    </svg>
                                </InputAdornment>
                            ),
                            classes: {
                                input: 'textfield-input',
                            },
                        }}

                    />
                    <Dropdown>
                        <Dropdown.Toggle className='task-btn font14 set-drop-width'>
                            {selectedCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSelectCategory('Select Category')}>
                                Select Category
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectCategory('Work')}>Work</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectCategory('Personal')}>Personal</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectCategory('Shopping')}>Shopping</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle className='task-btn font14 set-drop-width'>
                            {selectedPriority}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSelectCategory('Select Priority')}>
                                Select Priority
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectPriority('High')}>High</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectPriority('Medium')}>Medium</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectPriority('Low')}>Low</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className="task-btn font14" onClick={handleCreateTaskOpen}>
                        Create Task
                    </Button>
                </Box>
            </Box>
            <CreateTask
                open={openCreateTask}
                onClose={handleCreateTaskClose}
                onAddTask={handleAddTask}
                task={selectedTask}
                userData={userData}
            />
            <ConfirmDialog
                open={showConfirmDialog}
                onClose={cancelDeleteTask}
                onConfirm={confirmDeleteTask}
                message="Are you sure you want to delete this task?"
            />
            {filteredTasks.length === 0 ? (
                <Box className="no-tasks d-flex flex-column align-items-center justify-content-center">
                    <img
                        src={noData}
                        alt="No data available"
                        className="no-data-image"
                    />
                    <p className="text-muted mt-3">No tasks available. Create a new task to get started!</p>
                </Box>
            ) : (
                <Box className="row g-3 scroll-container">
                    {filteredTasks.map((task) => (
                        <Box className="col-12 col-sm-6 col-md-3" key={task.id}
                        >
                            <Card className="p-3 shadow-sm">
                                <Box className='task-title'>
                                    <Box>
                                        <Tooltip title={task.title} arrow>
                                            <Card.Title className="text-truncate mt-1">
                                                {truncateText(task.title, 18)}
                                            </Card.Title>
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Checkbox
                                            checked={task.status === 'Completed'}
                                            onChange={() => handleCheckboxChange(task)}
                                            name="checkbox"
                                            color="success"
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368" onClick={() => handleEditTask(task)}>
                                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                        </svg>&nbsp;
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ cursor: 'pointer' }}
                                            height="20px"
                                            viewBox="0 -960 960 960"
                                            width="20px"
                                            fill="#5f6368"
                                            onClick={() => handleDeleteTask(task)}
                                        >
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
                                        </svg>
                                    </Box>
                                </Box>
                                <Tooltip title={task.description} arrow>
                                    <Card.Text className="font14">
                                        {truncateText(task.description, 40)}
                                    </Card.Text>
                                </Tooltip>
                                <Box className="d-flex justify-content-between align-items-center mb-2">
                                    <Card.Text style={{ color: getStatusColor(task.status) }} className="fontw700 mb-0 font14">
                                        {task.status}
                                    </Card.Text>
                                    <Card.Text className="mb-0 fontw700 font14"> {task.category} </Card.Text>
                                    <Card.Text className="mb-0 fontw700 font14" style={{ color: getPriorityColor(task.priority) }}>{task.priority} </Card.Text>
                                </Box>

                                <Card.Text className='mt-1 font14'>
                                    {task.startDate} - {task.endDate}
                                    {isOverdue(task) && <span className='fontw700 text-danger'> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z" /></svg></span>}
                                </Card.Text>
                                <Box className='d-flex justify-content-between' gap={2}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id={`dropdown-task-${task.id}`} className="task-btn font14">
                                            Change Status
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleUpdateTaskStatus('Completed', task)}>
                                                Completed
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleUpdateTaskStatus('Ongoing', task)}>
                                                Ongoing
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#5f6368"
                                        onClick={() => handleSvgClick(task)}
                                        style={{ cursor: "pointer" }}
                                        className='mt-1'
                                    >
                                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                    </svg>

                                    <AddSubTask isDialogOpen={isDialogOpen} onClose={handleDialogClose}
                                        onSave={handleAddSubTask} cardId={cardId}
                                    />
                                </Box>
                                <ProgressBar
                                    className='mt-2'
                                    now={task.status === "Completed" ? 100 : task.status === "Ongoing" ? 50 : 0}
                                    label={task.status === "Completed" ? "100%" : task.status === "Ongoing" ? "50%" : "0%"}
                                    variant={task.status === "Completed" ? "success" : task.status === "Ongoing" ? "info" : "secondary"}
                                    style={{ backgroundColor: '#D1D4D6' }}
                                />
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TodoList;
