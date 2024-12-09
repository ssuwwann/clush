import styled from 'styled-components';
import { useContext } from 'react';
import { DateContext } from '../contexts/DateContext.jsx';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

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
    overflow: hidden;
    padding: 12px 0;
`;

const CustomCheckboxContainer = styled.label`
    position: relative;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const HiddenCheckbox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

const StyledCheckbox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid ${props => {
        switch (props.$level) {
            case 1:
                return '#33FF33';
            case 2:
                return '#66FF33';
            case 3:
                return '#99FF33';
            case 4:
                return '#CCFF33';
            case 5:
                return '#FFDD33';
            case 6:
                return '#FFCC00';
            case 7:
                return '#FF9966';
            case 8:
                return '#FF6666';
            case 9:
                return '#FF3333';
            case 10:
                return '#FF0000';
            default:
                return '#9E9E9E';
        }
    }};

    background-color: ${props => props.checked ? props.$color : 'transparent'};
    border-radius: 6px;
    transition: all 0.2s ease;

    &:after {
        content: '';
        position: absolute;
        display: ${props => props.checked ? 'block' : 'none'};
        left: 8px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;

const TodoContent = styled.div`
    flex: 1;
    min-width: 0;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const TodoDescription = styled.p`
    margin: 0;
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
    color: ${props => props.$completed ? '#999' : '#333'};
`;

const TodoDate = styled.span`
    display: block;
    font-size: 12px;
    color: #999;
    margin-top: 4px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const IconButton = styled.button`
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
    transition: all 0.2s ease;
    color: #666;

    &:hover {
        background-color: #f5f5f5;
        color: ${props => props.$delete ? '#ff4444' : '#333'};
    }
`;

const TodoItem = ({ todo, onModalClick, onToggleComplete, onDelete }) => {
  const { selectedDate } = useContext(DateContext);

  const getImportanceColor = (level) => {
    switch (level) {
      case 1:
        return '#33FF33';
      case 2:
        return '#66FF33';
      case 3:
        return '#99FF33';
      case 4:
        return '#CCFF33';
      case 5:
        return '#FFDD33';
      case 6:
        return '#FFCC00';
      case 7:
        return '#FF9966';
      case 8:
        return '#FF6666';
      case 9:
        return '#FF3333';
      case 10:
        return '#FF0000';
      default:
        return '#9E9E9E';
    }
  };

  const importanceLevel = Number(todo.importance.substring(1));
  const importanceColor = getImportanceColor(importanceLevel);
  
  return (
    <TodoItemContainer>
      <ContentContainer>
        <CustomCheckboxContainer>
          <HiddenCheckbox
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
          <StyledCheckbox
            checked={todo.completed}
            $level={importanceLevel}
            $color={importanceColor}
          />
        </CustomCheckboxContainer>

        <TodoContent onClick={() => onModalClick('view', todo)}>
          <TodoDescription $completed={todo.completed}>
            {todo.description}
          </TodoDescription>
          <TodoDate>{selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</TodoDate>
        </TodoContent>

        <ButtonContainer>
          <IconButton onClick={() => onModalClick('edit', todo)}>
            <FaEdit size={16} />
          </IconButton>
          <IconButton onClick={() => onDelete(todo.id)} $delete>
            <FaTrashAlt size={16} />
          </IconButton>
        </ButtonContainer>
      </ContentContainer>

    </TodoItemContainer>
  );
};

export default TodoItem;