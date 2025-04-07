export const getTasks = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.tasks || [];
};

export const saveTasks = (tasks) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.map(u => {
    if (u.id === user.id) {
      return { ...u, tasks };
    }
    return u;
  });

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  localStorage.setItem('currentUser', JSON.stringify({ ...user, tasks }));
};

export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now().toString(),
    ...task,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  saveTasks([...tasks, newTask]);
  return newTask;
};

export const updateTask = (taskId, updates) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, ...updates } : task
  );
  
  saveTasks(updatedTasks);
  return updatedTasks.find(task => task.id === taskId);
};

export const deleteTask = (taskId) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  saveTasks(filteredTasks);
};

export const toggleTaskCompletion = (taskId) => {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    updateTask(taskId, { completed: !task.completed });
  }
};

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    if (filters.status && task.completed !== (filters.status === 'completed')) {
      return false;
    }
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }
    return true;
  });
};

export const sortTasks = (tasks, sortBy) => {
  const sortedTasks = [...tasks];
  
  switch (sortBy) {
    case 'dueDate-asc':
      sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      break;
    case 'dueDate-desc':
      sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      break;
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      break;
    default:
      break;
  }
  
  return sortedTasks;
}; 