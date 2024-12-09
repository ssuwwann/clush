import styled from 'styled-components';
import { useContext } from 'react';
import { DateContext } from '../contexts/DateContext.jsx';
import TodoModal from './TodoModal.jsx';

const TodoItemContainer = styled.li`
    width: 100%;
    height: 100%;
    padding: 0 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    overflow: hidden; // 내용이 넘치지 않도록
    padding: 12px 0;
`;

const ImportanceIndicator = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 8px; // 텍스트 첫 줄과 맞춤
    flex-shrink: 0;
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
    min-width: 0; // text-overflow가 작동하기 위해 필요
`;

const TodoDescription = styled.p`
    margin: 0;
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 2줄로 제한
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
`;

const TodoDate = styled.span`
    display: block;
    font-size: 12px;
    color: #999;
    margin-top: 4px;
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
    flex-shrink: 0;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const TodoItem = ({ todo, onModalClick }) => {
  const { selectedDate } = useContext(DateContext);

  return (
    <TodoItemContainer>
      <ContentContainer>
        <ImportanceIndicator $level={Number(todo.importance.substring(1))} />
        <TodoContent onClick={() => onModalClick('view', todo)}>
          <TodoDescription>{todo.description}</TodoDescription>
          <TodoDate>{selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</TodoDate>
        </TodoContent>

        <EditButton onClick={() => onModalClick('edit', todo)}>✏️</EditButton>
      </ContentContainer>

    </TodoItemContainer>
  );
};

export default TodoItem;