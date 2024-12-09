import styled from 'styled-components';
import TodoItems from '../components/TodoItems.jsx';
import { useContext, useState } from 'react';
import { DateContext } from '../contexts/DateContext.jsx';
import TodoModal from '../components/TodoModal.jsx';
import { deleteTodo, editComplete, editTodo, saveTodo } from '../api/todo.js';
import { TodoContext } from '../contexts/TodoContext.jsx';

const TodoContainer = styled.div`
    flex: 1;
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

  const { todos, currentPage, totalPages, fetchTodos } = useContext(TodoContext);
  const { selectedDate, formattedDate } = useContext(DateContext);

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

  const handleModal = (mode, data) => {
    setModalState({
      isOpen: true,
      mode,
      data,
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

  const handleSubmit = async (id) => {
    if (modalState.mode === 'create' || modalState.mode === 'edit') {
      if (modalState.data.description.trim().length < 1) {
        alert('내용을 입력해주세요.');
        return;
      }

      const requestData = {
        ...modalState.data,
        importance: modalState.data.importance,
        dueDate   : formattedDate,
      };

      try {
        if (modalState.mode === 'create') await saveTodo(requestData);
        else await editTodo(id, requestData);

        fetchTodos(currentPage);
      } catch (error) {
        console.error('Failed to save todo: ', error);
      }
    }

    handleClose();
  };

  const handlePageChange = async (newPage) => {
    await fetchTodos(newPage);
  };

  const handleToggleComplete = async (id) => {
    await editComplete(id);
    await fetchTodos(currentPage);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    await fetchTodos(currentPage);
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

      <TodoItems
        todos={todos}
        totalPages={totalPages}
        currentPage={currentPage}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onModalClick={handleModal} />

      <TodoModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        initialData={modalState.data}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title="보기"
      />
    </TodoContainer>
  );
};

export default TodoPage;