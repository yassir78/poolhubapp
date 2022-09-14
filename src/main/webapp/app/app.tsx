import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import React from 'react';
import Navbar from 'app/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import MenuPage from 'app/pages/MenuPage';
import Footer from 'app/components/Footer';
import setupAxiosInterceptors from 'app/helpers/services/axios-interceptor';

/*const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));*/
setupAxiosInterceptors();
export const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-12	bg-octonary px-24 ">
        <Routes>
          <Route path="/" element={<MenuPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

// @ts-ignore
export default App;
