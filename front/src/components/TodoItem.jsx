import styled from 'styled-components';

const TodoItemContainer = styled.li`
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 10px;
`;
const TodoItem = () => {
  return (
    <TodoItemContainer>
      블라블라
    </TodoItemContainer>
  );
};

export default TodoItem;