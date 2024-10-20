import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 100000,
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

const getEvento = async (id) => {
  try {
    const response = await api.get(`/eventos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const updateEvento = async (evento, id) => {
  try {
    const response = await api.put(`/eventos/${id}`, evento);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const createEvento = async (evento) => {
  try {
    const response = await api.post(`/eventos`, evento);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const deleteEvento = async (id) => {
  try {
    const response = await api.delete(`/eventos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default {
  searchEventos,
  getEvento,
  updateEvento,
  createEvento,
  deleteEvento
}
