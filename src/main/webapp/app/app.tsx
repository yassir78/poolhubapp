import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import React, { useEffect } from 'react';
import Navbar from 'app/components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import MenuPage from 'app/pages/MenuPage';
import Footer from 'app/components/Footer';
import setupAxiosInterceptors from 'app/helpers/services/axios-interceptor';
import PoolDetailsPage from 'app/pages/PoolDetailsPage';
import PurchasePage from "app/pages/PurchasePage";
import LoginPage from 'app/pages/LoginPage';
import RegisterPage from 'app/pages/RegisterPage';
import store from 'app/redux/store';
import { clearAuthentication, getSession } from 'app/redux/slices/authSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
//setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));
setupAxiosInterceptors();
export const App = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(getSession());
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <div className="bg-octonary relative z-1 px-24">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pool/:id" element={<PoolDetailsPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

// @ts-ignore
export default App;
