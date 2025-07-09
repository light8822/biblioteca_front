import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Libro {
  idLibro: number;
  nombre: string;
}

interface Cliente {
  idCliente: number;
  nombre: string;
  apellido: string;
}

const RegistrarPrestamo: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [libro1, setLibro1] = useState<number>(0);
  const [libro2, setLibro2] = useState<number>(0);
  const [libro3, setLibro3] = useState<number>(0);
  const [usarLibro2, setUsarLibro2] = useState(false);
  const [usarLibro3, setUsarLibro3] = useState(false);
  const [idCliente, setIdCliente] = useState<number>(0);
  const tipoTransact = 1;

  const navigate = useNavigate();

  useEffect(() => {
    // Cargar libros
    axios.get<Libro[]>('https://localhost:7185/listaLibro', {
      headers: { Accept: 'text/plain' },
    }).then(res => setLibros(res.data))
      .catch(err => console.error('Error al cargar libros', err));

    // Cargar clientes
    axios.get<Cliente[]>('https://localhost:7185/listarClientes', {
      headers: { Accept: 'text/plain' },
    }).then(res => setClientes(res.data))
      .catch(err => console.error('Error al cargar clientes', err));
  }, []);

  const handleSubmit = async () => {
    const data = {
      libro1,
      libro2: usarLibro2 ? libro2 : 0,
      libro3: usarLibro3 ? libro3 : 0,
      id_cliente: idCliente,
      tipo_transact: tipoTransact,
    };

    try {
      await axios.post('https://localhost:7185/registrarPrestamo', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Préstamo registrado exitosamente');
      navigate('/libros');
    } catch (err) {
      console.error('Error al registrar préstamo', err);
      alert('No se pudo registrar el préstamo');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registrar Préstamo</h2>

      <div className="mb-3">
        <label className="form-label">Cliente:</label>
        <select
          className="form-select"
          value={idCliente}
          onChange={(e) => setIdCliente(+e.target.value)}
        >
          <option value={0}>-- Selecciona un cliente --</option>
          {clientes.map(cliente => (
            <option key={cliente.idCliente} value={cliente.idCliente}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Campo oculto para tipoTransact */}
      <input type="hidden" value={tipoTransact} />

      <div className="mb-3">
        <label className="form-label">Libro 1 (Obligatorio):</label>
        <select
          className="form-select"
          value={libro1}
          onChange={(e) => setLibro1(+e.target.value)}
        >
          <option value={0}>-- Selecciona un libro --</option>
          {libros.map((libro) => (
            <option key={libro.idLibro} value={libro.idLibro}>
              {libro.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={usarLibro2}
          onChange={() => setUsarLibro2(!usarLibro2)}
          id="libro2Check"
        />
        <label className="form-check-label" htmlFor="libro2Check">
          Agregar Libro 2
        </label>
        {usarLibro2 && (
          <select
            className="form-select mt-2"
            value={libro2}
            onChange={(e) => setLibro2(+e.target.value)}
          >
            <option value={0}>-- Selecciona un libro --</option>
            {libros.map((libro) => (
              <option key={libro.idLibro} value={libro.idLibro}>
                {libro.nombre}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={usarLibro3}
          onChange={() => setUsarLibro3(!usarLibro3)}
          id="libro3Check"
        />
        <label className="form-check-label" htmlFor="libro3Check">
          Agregar Libro 3
        </label>
        {usarLibro3 && (
          <select
            className="form-select mt-2"
            value={libro3}
            onChange={(e) => setLibro3(+e.target.value)}
          >
            <option value={0}>-- Selecciona un libro --</option>
            {libros.map((libro) => (
              <option key={libro.idLibro} value={libro.idLibro}>
                {libro.nombre}
              </option>
            ))}
          </select>
        )}
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        Registrar Préstamo
      </button>
    </div>
  );
};

export default RegistrarPrestamo;
