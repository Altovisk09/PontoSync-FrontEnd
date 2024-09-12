import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const PublicRoute = ({ element }) => {
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to="/agencies" />;
  }

  return element;
};

export default PublicRoute;
