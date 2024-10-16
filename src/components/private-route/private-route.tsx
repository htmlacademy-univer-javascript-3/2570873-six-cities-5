import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  hasAccess?: boolean;
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ hasAccess = false, children }) => hasAccess ? children : <Navigate to="/login" replace />;

export default PrivateRoute;
