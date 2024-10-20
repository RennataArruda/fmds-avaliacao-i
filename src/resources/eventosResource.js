import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

const searchEventos = async (search) => {
  try {
    const response = await api.post(`/eventos/search`, search);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default {
  searchEventos
}
