

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export function Protectedroutes ({ children }) {

  const { isAuthenticated } = useSelector(store => store.auth);

  if (!isAuthenticated) {
 
    return <Navigate to="/login" />;
  }

  return children;
};

