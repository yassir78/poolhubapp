import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated, setProtectedRoute } from 'app/redux/slices/authSlice';
import { Storage } from 'react-jhipster';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ route, children }) => {
  const navigate = useNavigate();
  console.log('AuthGuard', route);
  const isAuth = useSelector(isAuthenticated);
  console.log('AuthGuard', isAuth);
  useEffect(() => {
    if (!isAuth) {
      console.log('m not authenticated');
      Storage.local.set('protectedRoute', route);
      setProtectedRoute(route);
      console.log('redirect to login page ');
      navigate('/login');
    }
  }, []);

  return <> {children}</>;
};

export default AuthGuard;
