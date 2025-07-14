import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

interface Libro {
  idLibro: number;
  nombre: string;
  genero: string;
  cantidad: number;
  precioAlquiler: number;
  precioVenta: number;
}

interface Estante {
  idEstante: number;
  codigo: string;
  categoria: string;
}

const AgregarEjemplarPage: React.FC = () => {
  const { idLibro } = useParams<{ idLibro: string }>();
  const [libro, setLibro] = useState<Libro | null>(null);
  const [estantes, setEstantes] = useState<Estante[]>([]);
  const [idEstante, setIdEstante] = useState<number>(0);
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const libroRes = await axiosInstance.get<Libro>(`/verLibro`, {
          params: { id_libro: idLibro }
        });
        setLibro(libroRes.data);

        const estanteRes = await axiosInstance.get<Estante[]>(`/GetEstantes`);
        setEstantes(estanteRes.data);
      } catch (err) {
        console.error('Error al obtener información', err);
      }
    };
    fetchData();
  }, [idLibro]);

  const registrarEjemplar = async () => {
    try {
      await axiosInstance.post(`/AgregarItems`, {
        idLibro: Number(idLibro),
        codigo,
        idEstante,
      });
      alert('Ejemplar registrado exitosamente');
      navigate('/libros');
    } catch (err) {
      console.error('Error al registrar ejemplar', err);
      alert('No se pudo registrar el ejemplar');
    }
  };

  if (!libro) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h3>Registrar Ejemplar de: <strong>{libro.nombre}</strong></h3>

      <div className="mb-3">
        <label className="form-label">Código de Ejemplar</label>
        <input className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Selecciona Estante</label>
        <select className="form-select" value={idEstante} onChange={(e) => setIdEstante(Number(e.target.value))}>
          <option value={0}>-- Selecciona un estante --</option>
          {estantes.map((estante) => (
            <option key={estante.idEstante} value={estante.idEstante}>
              {estante.codigo} - {estante.categoria}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" onClick={registrarEjemplar}>Registrar Ejemplar</button>
    </div>
  );
};

export default AgregarEjemplarPage;
