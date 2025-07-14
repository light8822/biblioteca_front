import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = localStorage.getItem('usuario');

  return user ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
