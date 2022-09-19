import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated, setProtectedRoute } from 'app/redux/slices/authSlice';
import { Storage } from 'react-jhipster';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ route, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('AuthGuard', route);
  const isAuth = useSelector(isAuthenticated);
  if (!isAuth) {
    console.log('m not authenticated');
    Storage.local.set('protectedRoute', route);
    setProtectedRoute(route);
    console.log('redirect to login page ');
    navigate('/login');
    return;
  }
  console.log('m authenticated');
  return <>{children}</>;
};

export default AuthGuard;
