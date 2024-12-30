import { AppRoute, AuthorizationStatus } from '@const';
import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactElement;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ authorizationStatus, children }) => authorizationStatus === AuthorizationStatus.Auth ? (
  children
) : (
  <Navigate to={AppRoute.Login} />
);

export default PrivateRoute;
