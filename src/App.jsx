import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { isAuthenticated, logout } from './utils/auth';
import { getTasks, filterTasks, sortTasks } from './utils/tasks';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';
import TaskFilters from './components/tasks/TaskFilters';
import TaskProgress from './components/tasks/TaskProgress';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as TaskIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: null,
    priority: null,
    sortBy: 'dueDate-asc'
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (isAuthenticated()) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      setUser(currentUser);
      setTasks(getTasks());
    }
  }, []);

  const handleLogin = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
    setTasks(getTasks());
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setTasks([]);
  };

  const handleTaskUpdate = () => {
    setTasks(getTasks());
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filteredAndSortedTasks = sortTasks(
    filterTasks(tasks, filters),
    filters.sortBy
  );

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Task Tracker
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TaskIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FilterIcon />
          </ListItemIcon>
          <ListItemText primary="Filters" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={user?.email} />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 400,
              width: '100%',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom align="center">
              {showSignup ? 'Create Account' : 'Welcome Back'}
            </Typography>
            {showSignup ? (
              <SignupForm onSuccess={() => setShowSignup(false)} />
            ) : (
              <LoginForm onSuccess={handleLogin} />
            )}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                color="primary"
                onClick={() => setShowSignup(!showSignup)}
              >
                {showSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 250px)` },
            ml: { sm: '250px' },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Task Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 250px)` },
            mt: 8,
          }}
        >
          <Container maxWidth="lg">
            <Paper sx={{ p: 3, mb: 3 }}>
              <TaskProgress tasks={tasks} />
            </Paper>
            <Paper sx={{ p: 3, mb: 3 }}>
              <TaskFilters filters={filters} onFilterChange={setFilters} />
            </Paper>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
              >
                Add New Task
              </Button>
            </Box>

            {showTaskForm && (
              <Paper
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  p: 4,
                  maxWidth: 500,
                  width: '100%',
                  zIndex: 1000,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {editingTask ? 'Edit Task' : 'Add New Task'}
                </Typography>
                <TaskForm
                  task={editingTask}
                  onSuccess={() => {
                    setShowTaskForm(false);
                    setEditingTask(null);
                    handleTaskUpdate();
                  }}
                  onCancel={() => {
                    setShowTaskForm(false);
                    setEditingTask(null);
                  }}
                />
              </Paper>
            )}

            <Paper sx={{ p: 3 }}>
              <TaskList
                tasks={filteredAndSortedTasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onEditTask={handleEditTask}
              />
            </Paper>
          </Container>
        </Box>
      </Box>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App; 