import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const ProtectedRoute = ({ redirectTo }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
