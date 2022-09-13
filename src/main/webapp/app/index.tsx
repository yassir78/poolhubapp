import React from 'react';
import { createRoot } from 'react-dom/client';
import AppComponent from 'app/app';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'app/redux/store';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

const render = Component =>
  root.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>
  );

render(AppComponent);
