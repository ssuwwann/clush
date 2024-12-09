import { publicApi } from './custom-axios.js';

export const saveTodo = async (todoData) => {
  const response = await publicApi.post('/todos', todoData);
  return response;
};

export const getTodos = async (page = 1, formattedDate) => {
  const response = await publicApi.get(`/todos?page=${page}&due-date=${formattedDate}`);
  return response.data;
};

export const editTodo = async (id, editData) => {
  const response = await publicApi.put(`/todos/${id}`, editData);
  return response.data;
};

export const editComplete = async (id) => {
  const response = await publicApi.get(`/todos/${id}`);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await publicApi.delete(`/todos/${id}`);
  return response;
};