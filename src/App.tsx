// src/App.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      {/* Aquí puedes agregar una barra de navegación, por ejemplo */}
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};

export default App;
