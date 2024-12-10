import styled from 'styled-components';
import TodoItems from '../components/todo/TodoItems.jsx';
import { useContext, useState } from 'react';
import TodoModal from '../components/todo/TodoModal.jsx';
import { deleteTodo, editComplete, editTodo, saveTodo } from '../api/todo.js';
import { todoExport } from '../api/export.js';
import ExportModal from '../components/calendar/ExportModal.jsx';
import { TodoContext } from '../contexts/TodoContext.jsx';
import { DateContext } from '../contexts/DateContext.jsx';

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

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const WriteButton = styled.button`
    padding: 8px 16px;
    background-color: ${props => props.$dark ? '#000' : '#fff'};
    color: ${props => props.$dark ? '#fff' : '#000'};
    border: ${props => props.$dark ? 'none' : '1px solid black'};
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
    importance : 4,
  },
};

const TodoPage = () => {
  const [modalState, setModalState] = useState(initModalState);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const { todos, currentPage, totalPages, fetchTodos } = useContext(TodoContext);
  const { selectedDate, formattedDate } = useContext(DateContext);

  const handleExport = async (type, period) => {
    try {

      const params = new URLSearchParams({
        type,
        period,
        date: formattedDate,
      });

      const result = await todoExport(params);
      const filename = result.headers.get('Content-Disposition')?.split('filename=')[1] ||
        `export-${period}-${type}-${formattedDate}.${type === 'excel' ? 'xlsx' : 'pdf'}`;
      const blob = new Blob([result.data], {
        type: type === 'excel' ?
          'application/vnd.openxml formats-officedocument.spreadsheetml.sheet' :
          'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export: ', error);
    }
  };

  const handleModal = (mode, data) => {
    setModalState({
      isOpen: true,
      mode,
      data,
    });
  };

  const handleCreateClick = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: true,
      mode  : 'create',
    }));
  };

  const handleExportClick = () => {
    if (todos.length < 1) {
      alert('공유할 약속이 없습니다.');
      return;
    }
    setExportModalOpen(true);
  };

  const handleExportModalClose = () => {
    setExportModalOpen(false);
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

        <HeaderActions>
          <WriteButton onClick={handleExportClick}>내보내기</WriteButton>
          <WriteButton onClick={handleCreateClick} $dark>약속하기</WriteButton>
        </HeaderActions>
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

      <ExportModal
        isOpen={exportModalOpen}
        onClose={handleExportModalClose}
        onExport={handleExport}
      />
    </TodoContainer>
  );
};

export default TodoPage;