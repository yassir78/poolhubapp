import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import React from 'react';
import Navbar from 'app/components/Navbar';
import {Route, Routes, useLocation} from 'react-router-dom';
import MenuPage from 'app/pages/MenuPage';
import Footer from 'app/components/Footer';
import setupAxiosInterceptors from 'app/helpers/services/axios-interceptor';
import PoolDetailsPage from 'app/pages/PoolDetailsPage';
import LoginPage from "app/pages/LoginPage";

/*const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));*/
setupAxiosInterceptors();
export const App = () => {

  let location = useLocation();

  return (

    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar/>}
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/pool" element={<PoolDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer/>}
    </>
  );
};

// @ts-ignore
export default App;
