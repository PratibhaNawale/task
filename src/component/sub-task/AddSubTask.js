import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    InputLabel,
} from "@mui/material";
import { toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const AddSubTask = ({ isDialogOpen, onClose, cardId }) => {    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subtasks, setSubtasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [errors, setErrors] = useState({ title: "", description: "" });
    useEffect(() => {
        const storedSubtasks = JSON.parse(localStorage.getItem("subtasks"));
        if (storedSubtasks) {
            setSubtasks(storedSubtasks);
        }
    }, []);

    const generateUserId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    // const handleSaveTask = () => {
    //     // Validate input
    //     let formValid = true;
    //     let newErrors = { title: "", description: "" };

    //     if (!title) {
    //         formValid = false;
    //         newErrors.title = "Title is required";
    //     }
    //     if (!description.trim()) {
    //         formValid = false;
    //         newErrors.description = "Description is required";
    //     }

    //     setErrors(newErrors);

    //     if (!formValid) return;

    //     let updatedSubtasks;
    //     if (editingTask) {
    //         updatedSubtasks = subtasks.map((task) =>
    //             task.userId === editingTask.userId
    //                 ? { ...task, title, body: description }
    //                 : task
    //         );
    //         toast.success("Subtask updated successfully!", {
    //             style: { backgroundColor: "green", color: "white" },
    //         });
    //     } else {
    //         const newTask = {
    //             userId: generateUserId(),
    //             title,
    //             body: description,
    //             cardId:cardId
    //         };
    //         updatedSubtasks = [...subtasks, newTask];
    //         toast.success("Subtask added successfully!", {
    //             style: { backgroundColor: "green", color: "white" },
    //         });
    //     }

    //     localStorage.setItem("subtasks", JSON.stringify(updatedSubtasks));
    //     setSubtasks(updatedSubtasks);

    //     setTitle("");
    //     setDescription("");
    //     setEditingTask(null);
    // };


    useEffect(() => {
        // Fetch subtasks for the specific cardId when the component mounts or cardId changes
        if (cardId) {
            const storedSubtasks = JSON.parse(localStorage.getItem("subtasks")) || [];
            const filteredSubtasks = storedSubtasks.filter((task) => task.cardId === cardId);
            setSubtasks(filteredSubtasks);
        }
    }, [cardId]); // Re-run when cardId changes
    
    const handleSaveTask = () => {
        // Validate input
        let formValid = true;
        let newErrors = { title: "", description: "" };
    
        if (!title) {
            formValid = false;
            newErrors.title = "Title is required";
        }
        if (!description.trim()) {
            formValid = false;
            newErrors.description = "Description is required";
        }
    
        setErrors(newErrors);
    
        if (!formValid) return;
    
        let updatedSubtasks;
        if (editingTask) {
            updatedSubtasks = subtasks.map((task) =>
                task.userId === editingTask.userId
                    ? { ...task, title, body: description }
                    : task
            );
            toast.success("Subtask updated successfully!", {
                style: { backgroundColor: "green", color: "white" },
            });
        } else {
            const newTask = {
                userId: generateUserId(),
                title,
                body: description,
                cardId: cardId, 
            };
            updatedSubtasks = [...subtasks, newTask];
            toast.success("Subtask added successfully!", {
                style: { backgroundColor: "green", color: "white" },
            });
        }
        const storedSubtasks = JSON.parse(localStorage.getItem("subtasks")) || [];
        const allSubtasks = [...storedSubtasks.filter((task) => task.cardId !== cardId), ...updatedSubtasks];
        localStorage.setItem("subtasks", JSON.stringify(allSubtasks));
        setSubtasks(updatedSubtasks);
    
        setTitle("");
        setDescription("");
        setEditingTask(null);
    };
    
    const handleEditTask = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.body);
    };

    const handleDeleteTask = (userId) => {
        const updatedSubtasks = subtasks.filter((task) => task.userId !== userId);
        localStorage.setItem("subtasks", JSON.stringify(updatedSubtasks));
        setSubtasks(updatedSubtasks);
        toast.error("Subtask deleted successfully!", {
            style: { backgroundColor: "green", color: "white" },
        });
    };

    const handleTitleChange = (event) => {
        const value = event.target.value;
        if (value === "" || value.trim().length > 0) {
            setTitle(value);
            if (value.trim()) {
                setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
            }
        }
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        if (value === "" || value.trim().length > 0) {
            setDescription(value);
            if (value.trim()) {
                setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
            }
        }
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setEditingTask(null);
        setErrors({ title: "", description: "" });
        onClose();
    };

    return (
        <Dialog open={isDialogOpen} onClose={onClose} className="set-width p-5 create-task-dialog">
            <Box className='container'>
                <DialogTitle>{editingTask ? "Edit Subtask" : "Add Subtask"}</DialogTitle>
                <DialogContent>
                    <InputLabel className="labels">
                        Title <span>*</span>
                    </InputLabel>
                    <TextField
                        className="inputs"
                        placeholder="Enter Title"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        InputProps={{
                            classes: {
                                input: 'textfield-input',
                            },
                        }}
                    />
                    <InputLabel className="labels mt-2">
                        Description <span>*</span>
                    </InputLabel>
                    <TextField
                        className="inputs"
                        placeholder="Enter Description"
                        fullWidth
                        value={description}
                        onChange={handleDescriptionChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        InputProps={{
                            classes: {
                                input: 'textfield-input',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="no-btn inputs">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveTask} className="task-btn font14">
                        {editingTask ? "Update" : "Save"}
                    </Button>
                </DialogActions>

                <Box>
                    <DialogTitle>Saved Sub Task:</DialogTitle>
                    <ul>
                        {subtasks.map((task) => (
                            <li key={task.userId}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <strong>{task.title}</strong>: {task.body}
                                    </Box>
                                    <Box>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ cursor: "pointer" }}
                                            height="20px"
                                            viewBox="0 -960 960 960"
                                            width="20px"
                                            fill="#5f6368"
                                            onClick={() => handleEditTask(task)}
                                        >
                                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                        </svg>
                                        &nbsp;
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ cursor: "pointer" }}
                                            height="20px"
                                            viewBox="0 -960 960 960"
                                            width="20px"
                                            fill="#5f6368"
                                            onClick={() => handleDeleteTask(task.userId)}
                                        >
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
                                        </svg>
                                    </Box>
                                </Box>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
        </Dialog>
    );
};

export default AddSubTask;
