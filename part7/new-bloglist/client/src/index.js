import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { NotFound } from './components/NotFound';
import { Provider } from 'react-redux';
import { store } from './store';
import Index from './components/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            <Route path="/index" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// reportWebVitals(console.log);
