import styled from 'styled-components';
import TodoItems from '../components/TodoItems.jsx';
import { useContext } from 'react';
import { DateContext } from '../contexts/DateContext.jsx';

const TodoContainer = styled.div`
    flex: 1;
    min-width: 0;
    border: 2px solid #000;
    border-radius: 8px;
    padding: 20px;
`;

const TodoTitle = styled.h2`
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
`;


const TodoPage = () => {
  const { selectedDate } = useContext(DateContext);
  
  return (
    <TodoContainer>
      <TodoTitle>오늘 할 일</TodoTitle>
      <TodoItems />
    </TodoContainer>
  );
};

export default TodoPage;