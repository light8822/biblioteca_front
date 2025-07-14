import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const RegistrarDevolucion: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDevolucion = async () => {
    try {
      const response = await axiosInstance.post('/registrarDevolucion', {
        codigo,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      setMensaje(response.data);
      setError('');

      setTimeout(() => {
      navigate('/libros');
    }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data || 'Error al registrar devolución.';
      setError(errorMsg);
      setMensaje('');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registrar Devolución</h2>

      <div className="mb-3">
        <label className="form-label">Código del Libro:</label>
        <input
          type="text"
          className="form-control"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>

      <button onClick={handleDevolucion} className="btn btn-success">
        Devolver Libro
      </button>

      {mensaje && (
        <div className="alert alert-success mt-3">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      <button
        onClick={() => navigate('/libros')}
        className="btn btn-outline-secondary mt-3 ms-2"
      >
        Volver
      </button>
    </div>
  );
};

export default RegistrarDevolucion;
