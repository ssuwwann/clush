import styled from "styled-components";

const TodoContainer = styled.div`
    flex: 1;
    border: 2px solid #000;
    border-radius: 8px;
    padding: 20px;
    min-height: 400px;
`;

const TodoTitle = styled.h2`
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
`;

const TodoList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const TodoItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const TodoPage = () => {
  return (
      <TodoContainer>
        <TodoTitle>오늘 할 일</TodoTitle>
        <TodoList>
          <TodoItem>
            이제 적을것
          </TodoItem>
        </TodoList>
      </TodoContainer>
  )
}

export default TodoPage