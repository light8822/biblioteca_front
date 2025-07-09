import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LibrosPage from './pages/LibrosPage';
import LibroPage from './pages/LibroPage';
import RegistrarPrestamo from './pages/RegistrarPrestamo';
import AgregarEjemplarPage from './pages/AgregarEjemplarPage';
import CrearNuevoLibroPage from './pages/CrearNuevoLibroPage';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/libros" element={<LibrosPage />} />
      <Route path="/libro/:id" element={<LibroPage />} />
      <Route path="/registrar-prestamo" element={<RegistrarPrestamo />} />
      <Route path="/agregar-ejemplar/:idLibro" element={<AgregarEjemplarPage />} />
      <Route path="/crear-libro" element={<CrearNuevoLibroPage />} />
    </Routes>
  </BrowserRouter>
);
