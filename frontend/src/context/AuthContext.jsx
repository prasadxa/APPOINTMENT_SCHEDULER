import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user details if token exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token and fetch user info
          const response = await api.get('/auth/me/');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to authenticate:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/login/', credentials);
      const { access } = response.data;
      localStorage.setItem('token', access);
      
      // Fetch user profile securely using the access token
      const meResponse = await api.get('/auth/me/', {
        headers: { Authorization: `Bearer ${access}` }
      });
      setUser(meResponse.data);
      
      toast.success('Logged in successfully!');
      return meResponse.data;
    } catch (error) {
      toast.error('Invalid credentials');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
