import styled from 'styled-components';
import TodoItems from '../components/TodoItems.jsx';
import { useContext, useState } from 'react';
import { DateContext } from '../contexts/DateContext.jsx';
import TodoModal from '../components/TodoModal.jsx';
import { saveTodo } from '../api/todo.js';

const TodoContainer = styled.div`
    flex: 1;
    min-width: 0;
    border: 2px solid #000;
    border-radius: 8px;
    padding: 20px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
`;

const TodoTitle = styled.h2`
    margin: 0
`;

const WriteButton = styled.button`
    padding: 8px 16px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #333;
    }
`;

const initModalState = {
  isOpen: false,
  mode  : 'create',
  data  : {
    description: '',
    importance : 5,
  },
};

const TodoPage = () => {
  const [modalState, setModalState] = useState(initModalState);
  const { selectedDate } = useContext(DateContext);

  const handleCreateClick = () => {
    setModalState({
      isOpen: true,
      mode  : 'create',
      data  : {
        description: '',
        importance : 5,
      },
    });
  };

  const handleEditClick = (todoData) => {
    setModalState({
      isOpen: true,
      mode  : 'edit',
      data  : todoData,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (modalState.mode === 'create') {
      if (modalState.data.description.trim().length < 1) {
        alert('내용을 입력해주세요.');
        return;
      }

      const requestData = {
        ...modalState.data,
        importance: `L${modalState.data.importance}`,
      };

      const result = await saveTodo(requestData);
      console.log('result', result);
    } else {
      // 수정 시 할것

    }

    handleClose();
  };

  const handleClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <TodoContainer>
      <HeaderContainer>
        <TodoTitle>{selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</TodoTitle>
        <WriteButton onClick={handleCreateClick}>약속하기</WriteButton>
      </HeaderContainer>

      <TodoItems onEditClick={handleEditClick} />

      <TodoModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        initialData={modalState.data}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title={modalState.mode === 'create' ? '약속하기' : '일구이언'}
      />
    </TodoContainer>
  );
};

export default TodoPage;