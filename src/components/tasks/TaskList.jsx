import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Chip,
  Box,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import { toggleTaskCompletion, deleteTask } from '../../utils/tasks';
import toast from 'react-hot-toast';

const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'success'
};

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete, onEditTask }) => {
  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No tasks found. Add a new task to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {tasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <ListItem
            sx={{
              bgcolor: 'background.paper',
              mb: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => onTaskUpdate(task.id, { completed: !task.completed })}
              color="primary"
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'text.secondary' : 'text.primary',
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Chip
                    icon={<FlagIcon />}
                    label={task.priority}
                    size="small"
                    color={priorityColors[task.priority]}
                    sx={{ ml: 1 }}
                  />
                </Box>
              }
              secondary={
                <Box sx={{ mt: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title="Edit Task">
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEditTask(task)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Task">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onTaskDelete(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          {index < tasks.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default TaskList; 