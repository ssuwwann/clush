import TodoItem from './TodoItem.jsx';
import styled from 'styled-components';

const TodoItemListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 8px;
`;

const PageButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: ${props => props.$active ? '#000' : '#fff'};
    color: ${props => props.$active ? '#fff' : '#000'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${props => props.$active ? '#000' : '#eee'};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const JumpButton = styled(PageButton)`
    width: auto;
    padding: 0 12px;
    border-radius: 16px;
`;

const PageDots = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;

    &::before {
        content: "•••";
    }
`;

const TodoItems = ({ todos, totalPages, currentPage, onPageChange, onEditClick }) => {
  const getPageButtons = () => {
    const buttons = [];
    let startPage, endPage;

    if (totalPages > 5) {
      buttons.push(
        <JumpButton
          key="jump-back"
          onClick={() => onPageChange(Math.max(1, currentPage - 5))}
        >
          &lt;&lt;
        </JumpButton>,
      );
    }

    buttons.push(
      <PageButton
        key={1}
        $active={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        1
      </PageButton>,
    );

    if (currentPage <= 2) {
      startPage = 2;
      endPage = 4;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 3;
      endPage = totalPages - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    startPage = Math.max(2, startPage);
    endPage = Math.min(totalPages - 1, endPage);

    if (startPage > 2) buttons.push(<PageDots key={'dots-start'} />);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          $active={currentPage === i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PageButton>,
      );
    }

    if (endPage < totalPages - 1) buttons.push(<PageDots key="dots-end" />);

    if (totalPages > 1) {
      buttons.push(
        <PageButton
          key={totalPages}
          $active={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PageButton>,
      );
    }

    if (totalPages > 5) {
      buttons.push(
        <JumpButton
          key="jump-forward"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 5))}
          disabled={totalPages - 1 < currentPage}
        >
          &gt;&gt;
        </JumpButton>,
      );
    }

    return buttons;
  };

  return (
    <>
      <TodoItemListContainer>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEditClick={() => onEditClick(todo)}
          />
        ))}
      </TodoItemListContainer>

      <PaginationContainer>
        {getPageButtons()}
      </PaginationContainer>
    </>
  );
};

export default TodoItems;