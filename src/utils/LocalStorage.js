
export const loadTasksFromLocalStorage = (key) => {
    const savedTasks = localStorage.getItem(key);
    return savedTasks ? JSON.parse(savedTasks) : [];
  };
  
  export const saveTasksToLocalStorage = (key, tasks) => {
    localStorage.setItem(key, JSON.stringify(tasks));
  };
  
  