import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const CrearNuevoLibroPage: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [precioAlquiler, setPrecioAlquiler] = useState<number>(0);
  const [precioVenta, setPrecioVenta] = useState<number>(0);
  const navigate = useNavigate();

  const registrarLibro = async () => {
    if (!nombre || !genero || precioAlquiler <= 0 || precioVenta <= 0) {
      alert('Todos los campos son obligatorios y deben tener valores válidos.');
      return;
    }

    try {
      await axiosInstance.post('/crearLibro', {
        nombre,
        genero,
        cantidad: 0, // campo oculto
        precioAlquiler,
        precioVenta,
      }, {
        headers: {
          Accept: 'text/plain',
        },
      });

      alert('Libro registrado exitosamente');
      navigate('/libros');
    } catch (err) {
      console.error('Error al registrar libro', err);
      alert('No se pudo registrar el libro');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrar Nuevo Libro</h2>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Género</label>
        <input
          type="text"
          className="form-control"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio Alquiler</label>
        <input
          type="number"
          className="form-control"
          value={precioAlquiler}
          onChange={(e) => setPrecioAlquiler(+e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio Venta</label>
        <input
          type="number"
          className="form-control"
          value={precioVenta}
          onChange={(e) => setPrecioVenta(+e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={registrarLibro}>
        Registrar Libro
      </button>
    </div>
  );
};

export default CrearNuevoLibroPage;
