import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3003/'
});

export const fetchData = async (id) => {
  return await api.get(`/books/${id}`);
};

export const fetchAllData = async () => {
  return await api.get('/books/');
};

export const createData = async (newBook) => {
  return await api.post('/books/', newBook);
};

export const editData = async (id, editedData) => {
  return await api.put(`/books/${id}`, editedData);
};

export const deleteData = async (id) => {
  return await api.delete(`/books/${id}`);
};