import styled from 'styled-components';
import { useContext } from 'react';
import { DateContext } from '../contexts/DateContext.jsx';


const TodoItemContainer = styled.li`
    padding: 16px 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
`;

const ImportanceIndicator = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => {
        switch (props.$level) {
            case 1:
                return '#33FF33';  // 가장 연한 녹색
            case 2:
                return '#66FF33';
            case 3:
                return '#99FF33';
            case 4:
                return '#CCFF33';  // 연한 녹색
            case 5:
                return '#FFDD33';
            case 6:
                return '#FFCC00';  // 노란색
            case 7:
                return '#FF9966';  // 주황에 가까운 색
            case 8:
                return '#FF6666';
            case 9:
                return '#FF3333';
            case 10:
                return '#FF0000';  // 가장 진한 빨강
            default:
                return '#9E9E9E';
        }
    }};
`;

const TodoContent = styled.div`
    flex: 1;
`;

const TodoDescription = styled.p`
    margin: 0;
    font-size: 16px;
    color: #333;
`;

const TodoDate = styled.span`
    font-size: 12px;
    color: #999;
`;

const EditButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const TodoItem = ({ todo, onEditClick }) => {
  const { selectedDate } = useContext(DateContext);

  return (
    <TodoItemContainer>
      <ContentContainer>
        <ImportanceIndicator $level={Number(todo.importance.substring(1))} />
        <TodoContent>
          <TodoDescription>{todo.description}</TodoDescription>
          <TodoDate>{selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</TodoDate>
        </TodoContent>

        <EditButton onClick={() => onEditClick(todo)}>✏️</EditButton>
      </ContentContainer>
    </TodoItemContainer>
  );
};

export default TodoItem;