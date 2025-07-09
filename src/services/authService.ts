import axios from 'axios';

const API_URL = 'https://localhost:7185/login';

export const login = async (codigo: string, clave: string) => {
  const response = await axios.post(API_URL, {
      codigo, 
      clave 
  });
  return response.data;
};
