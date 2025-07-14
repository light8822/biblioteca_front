import axios from 'axios';

const API_URL = 'https://localhost:7185/login';

export const login = async (codigo: string, clave: string) => {
  const response = await axios.post(API_URL, {
      codigo, 
      clave 
  });

  const { token, ...userData } = response.data;

  localStorage.setItem('token', token);

  return userData;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};