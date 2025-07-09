import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Libro {
  idLibro: number;
  nombre: string;
  genero: string;
  cantidad: number;
  precioAlquiler: number;
  precioVenta: number;
}

const LibroPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<Libro | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const res = await axios.get<Libro>('https://localhost:7185/verLibro', {
          params: { id_libro: id },
        });
        setLibro(res.data);
      } catch (err) {
        console.error('Error al obtener detalle del libro', err);
      }
    };
    fetchLibro();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!libro) return;
    const { name, value } = e.target;
    setLibro({
      ...libro,
      [name]: name.includes('precio') ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://localhost:7185/editarLibro`, {
        nombre: libro?.nombre,
        genero: libro?.genero,
        precioAlquiler: libro?.precioAlquiler,
        precioVenta: libro?.precioVenta
      }, {
        params: { id_libro: libro?.idLibro },
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert('Libro editado correctamente');
      navigate('/libros');
    } catch (err) {
      console.error('Error al editar libro', err);
      alert('No se pudo editar el libro');
    }
  };

  if (!libro) return <div className="container mt-4">Cargando libro...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Libro</h2>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={libro.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Género</label>
        <input
          type="text"
          className="form-control"
          name="genero"
          value={libro.genero}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio Alquiler</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="precioAlquiler"
          value={libro.precioAlquiler}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio Venta</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="precioVenta"
          value={libro.precioVenta}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Guardar Cambios
      </button>
    </div>
  );
};

export default LibroPage;
