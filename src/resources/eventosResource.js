import axios from 'axios';
import tokenUtils from '@/utils/validar-token';


const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 100000,
});

const searchEventos = async (search) => {
  try {
    const token = await tokenUtils.getToken();
    if (!token) {
      return [];
    }
    const response = await api.post(`/eventos/search`, search, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getEvento = async (id) => {
  try {
    const token = await tokenUtils.getToken();
    if (!token) {
      return {};
    }
    const response = await api.get(`/eventos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const updateEvento = async (evento, id) => {
  try {
    const token = await tokenUtils.getToken();
    if (!token) {
      return {};
    }
    const response = await api.put(`/eventos/${id}`, evento, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const createEvento = async (evento) => {
  try {
    const token = await tokenUtils.getToken();
    if (!token) {
      return {};
    }
    const response = await api.post(`/eventos`, evento, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const deleteEvento = async (id) => {
  try {

    const token = await tokenUtils.getToken();
    if (!token) {
      return {};
    }
    const response = await api.delete(`/eventos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
