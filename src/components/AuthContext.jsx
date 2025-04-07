import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUp = (username, password, name) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u) => u.username === username)) {
      throw new Error('Username already exists');
    }
    const newUser = { username, password, name };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const signIn = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    setUser(foundUser);
    return true;
  };

  const signOut = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);