export const signUp = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.find(user => user.email === email)) {
    throw new Error('User already exists');
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password, // In a real app, this should be hashed
    tasks: []
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
}; 