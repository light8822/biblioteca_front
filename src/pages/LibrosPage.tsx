import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Libro {
  idLibro: number;
  nombre: string;
  genero: string;
  cantidad: number;
  precioAlquiler: number;
  precioVenta: number;
}

const LibrosPage: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const navigate = useNavigate();

  const fetchLibros = async () => {
    try {
      const res = await axios.get<Libro[]>('https://localhost:7185/listaLibro', {
        headers: {
          Accept: 'text/plain',
        },
      });
      setLibros(res.data);
    } catch (err) {
      console.error('Error al cargar libros', err);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const eliminarLibro = async (id: number) => {
    const confirmado = window.confirm(`¿Estás seguro de eliminar el libro con ID ${id}?`);
    if (!confirmado) return;

    try {
      await axios.delete(`https://localhost:7185/eliminarLibro`, {
        params: { id_libro: id },
      });
      alert('Libro eliminado exitosamente');
      fetchLibros(); // recargar lista
    } catch (err) {
      console.error('Error al eliminar libro', err);
      alert('No se pudo eliminar el libro');
    }
  };

  const irAEditar = (id: number) => {
    navigate(`/libro/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Lista de Libros</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate('/registrar-prestamo')}
      >
        Registrar Préstamo
      </button>
      &nbsp;
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate('/crear-libro')}
      >
        Registrar Libro
      </button>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Cantidad</th>
            <th>Precio Alquiler</th>
            <th>Precio Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.idLibro}>
              <td>{libro.idLibro}</td>
              <td>{libro.nombre}</td>
              <td>{libro.genero}</td>
              <td>{libro.cantidad}</td>
              <td>{libro.precioAlquiler}</td>
              <td>{libro.precioVenta}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => irAEditar(libro.idLibro)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/agregar-ejemplar/${libro.idLibro}`)}
                >
                  Agregar+
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarLibro(libro.idLibro)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default LibrosPage;
