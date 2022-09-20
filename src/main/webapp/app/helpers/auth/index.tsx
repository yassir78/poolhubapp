import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated, setProtectedRoute } from 'app/redux/slices/authSlice';
import { Storage } from 'react-jhipster';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ route, children }) => {
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthenticated);
  console.log('isAuth', isAuth);

  useEffect(() => {
    if (!isAuth) {
      Storage.local.set('protectedRoute', route);
      setProtectedRoute(route);
      navigate('/login');
    }
  }, [isAuth]);

  return <> {children}</>;
};

export default AuthGuard;
