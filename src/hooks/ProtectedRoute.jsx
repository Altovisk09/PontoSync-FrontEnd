import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
