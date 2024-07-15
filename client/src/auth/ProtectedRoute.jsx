import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import state from '../store';

const ProtectedRoute = ({ children }) => {
  const snap = useSnapshot(state);
  
  return snap.email ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
