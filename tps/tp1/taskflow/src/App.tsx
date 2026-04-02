import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { setAuthToken } from './api/axios';

import Login from './features/auth/Login'; 
import Dashboard from './pages/Dashboard'; 
import ProjectDetail from './pages/ProjectDetail'; 
import ProtectedRoute from './components/ProtectedRoute'; 

export default function App() { 

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return ( 
    <Routes> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/dashboard" element={ 
        <ProtectedRoute><Dashboard /></ProtectedRoute> 
      } /> 
      <Route path="/projects/:id" element={ 
        <ProtectedRoute><ProjectDetail /></ProtectedRoute> 
      } /> 
      <Route path="/" element={<Navigate to="/dashboard" replace />} /> 
      <Route path="*" element={<Navigate to="/dashboard" replace />} /> 
    </Routes> 
  ); 
}