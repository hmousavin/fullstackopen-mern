import React from 'react';
import { Outlet } from 'react-router-dom';
import Notification from './Notification';

function App() {
  return (
    <div>
      <Notification />
      <Outlet />
    </div>
  );
}

export default App;
