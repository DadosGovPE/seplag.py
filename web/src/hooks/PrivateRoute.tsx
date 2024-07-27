// components/PrivateRoute.tsx
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { signed } = useAuth();

  return signed ? element : <Navigate to="/" />;
};

export default PrivateRoute;
