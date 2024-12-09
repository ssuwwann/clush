import { createContext, useContext, useEffect, useState } from 'react';
import { DateContext } from './DateContext.jsx';
import { getTodos } from '../api/todo.js';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { selectedDate, formattedDate } = useContext(DateContext);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTodos = async (page) => {
    try {
      const result = await getTodos(page, formattedDate);
      setTodos(result.todos);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
    } catch (error) {
      console.log('Failed to fetch todos: ', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedDate, formattedDate, currentPage]);

  return (
    <TodoContext.Provider value={{ todos, currentPage, totalPages, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );

};