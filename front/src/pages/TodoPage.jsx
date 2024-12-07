import styled from 'styled-components';
import TodoItems from '../components/TodoItems.jsx';
import { useContext, useState } from 'react';
import { DateContext } from '../contexts/DateContext.jsx';
import TodoModal from '../components/TodoModal.jsx';

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
  data  : null,
};

const TodoPage = () => {
  const [modalState, setModalState] = useState(initModalState);
  const { selectedDate } = useContext(DateContext);

  const handleCreateClick = () => {
    setModalState({
      isOpen: true,
      mode  : 'create',
      data  : null,
    });
  };

  const handleEditClick = (todoData) => {
    setModalState({
      isOpen: true,
      mode  : 'edit',
      data  : todoData,
    });
  };

  const handleClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = () => {
    if (modalState.mode === 'create') {
      // 생성 시 할것
    } else {
      // 수정 시 할것

    }

    handleClose();
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
        onSubmit={handleSubmit}
        title={modalState.mode === 'create' ? '약속하기' : '일구이언'}
      />
    </TodoContainer>
  );
};

export default TodoPage;