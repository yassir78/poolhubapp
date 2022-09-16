import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import React from 'react';
import Navbar from 'app/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import MenuPage from 'app/pages/MenuPage';
import Footer from 'app/components/Footer';
import setupAxiosInterceptors from 'app/helpers/services/axios-interceptor';
import PoolDetailsPage from 'app/pages/PoolDetailsPage';
import PurchasePage from "app/pages/PurchasePage";

/*const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));*/
setupAxiosInterceptors();
export const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="bg-octonary relative z-1 px-24">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/pool" element={<PoolDetailsPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

// @ts-ignore
export default App;
