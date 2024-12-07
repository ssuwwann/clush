import TodoItem from './TodoItem.jsx';
import styled from 'styled-components';

const TodoItemListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const TodoItems = () => {
  return (
    <TodoItemListContainer>
      <TodoItem />
    </TodoItemListContainer>
  );
};

export default TodoItems;