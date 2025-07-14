// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import LibrosPage from './pages/LibrosPage';
import LibroPage from './pages/LibroPage';
import RegistrarPrestamo from './pages/RegistrarPrestamo';
import AgregarEjemplarPage from './pages/AgregarEjemplarPage';
import CrearNuevoLibroPage from './pages/CrearNuevoLibroPage';
import RegistrarDevolucion from './pages/RegistrarDevolucion';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/* Login público */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/libros"
        element={
          <PrivateRoute>
            <LibrosPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/libro/:id"
        element={
          <PrivateRoute>
            <LibroPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/registrar-prestamo"
        element={
          <PrivateRoute>
            <RegistrarPrestamo />
          </PrivateRoute>
        }
      />
      <Route
        path="/agregar-ejemplar/:idLibro"
        element={
          <PrivateRoute>
            <AgregarEjemplarPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/crear-libro"
        element={
          <PrivateRoute>
            <CrearNuevoLibroPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/devolucion"
        element={
          <PrivateRoute>
            <RegistrarDevolucion />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
