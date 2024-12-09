import { publicApi } from './custom-axios.js';

export const saveTodo = async (todoData) => {
  const response = await publicApi.post('/todos', todoData);
  return response.data;
};

export const getTodos = async (page = 1, selectedDate) => {
  const formattedDate = selectedDate.toLocaleDateString('en-CA');
  const response = await publicApi.get(`/todos?page=${page}&date=${formattedDate}`);
  return response.data;
};


export const editTodo = async (id, editData) => {
  console.log('id', id);
  console.log('editData', editData);
  const response = await publicApi.put(`/todos/${id}`, editData);
  return response.data;
};