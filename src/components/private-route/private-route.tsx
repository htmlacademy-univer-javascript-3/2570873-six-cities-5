import { AppRoute, AuthorizationStatus } from '@const';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: React.ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ authorizationStatus, children }) => {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return children;
  }

  return <Navigate to={AppRoute.Login} />;
};

export default PrivateRoute;
