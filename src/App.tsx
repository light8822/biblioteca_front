import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './services/authService';

const App: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(codigo, clave);

      // Guardar en localStorage
      localStorage.setItem('usuario', JSON.stringify(user));

      // Redirigir a página de libros
      navigate('/libros');
    } catch (err) {
      alert('Credenciales inválidas');
      console.error(err);
    }
  };

  return (
  <div className="container mt-5" style={{ maxWidth: 400 }}>
    <h2 className="mb-4">Login</h2>
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label className="form-label">Código</label>
        <input
          type="text"
          className="form-control"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Clave</label>
        <input
          type="password"
          className="form-control"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Ingresar
      </button>
    </form>
  </div>
);

};

export default App;
