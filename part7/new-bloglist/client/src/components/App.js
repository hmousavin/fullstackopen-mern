import React from 'react';
import { Outlet } from 'react-router-dom';
import Notification from './Notification';
import Index from './Index';

function App() {
  return (
    <div>
      <Notification />
      <Outlet />
      <Index />
    </div>
  );
}

export default App;
