import { publicApi } from './custom-axios.js';

export const saveTodo = async (todoData) => {
  const response = await publicApi.post('/todos', todoData);
  return response.data;
};