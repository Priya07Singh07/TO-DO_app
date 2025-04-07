import { Box, Typography, LinearProgress, Grid, Paper } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const TaskProgress = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === 'high' && !task.completed
  ).length;

  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Task Progress
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            Overall Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: 'success.light',
              borderRadius: 1,
            }}
          >
            <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
            <Box>
              <Typography variant="h6">{completedTasks}</Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Tasks
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: 'warning.light',
              borderRadius: 1,
            }}
          >
            <PendingIcon sx={{ mr: 1, color: 'warning.main' }} />
            <Box>
              <Typography variant="h6">{totalTasks - completedTasks}</Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Tasks
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: 'error.light',
              borderRadius: 1,
            }}
          >
            <WarningIcon sx={{ mr: 1, color: 'error.main' }} />
            <Box>
              <Typography variant="h6">{highPriorityTasks}</Typography>
              <Typography variant="body2" color="text.secondary">
                High Priority Tasks
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskProgress; 