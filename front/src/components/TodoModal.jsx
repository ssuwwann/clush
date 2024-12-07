import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
    margin: 0;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    resize: none;
    box-sizing: border-box;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const Button = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    ${props => props.$primary ? `
        background-color: #000;
        color: #fff;
        
        &:hover {
            background-color: #333;
        }
    ` : `
        background-color: #eee;
        color: #000;
        
        &:hover {
            background-color: #ddd;
        }
    `}
`;


const TodoModal = ({ isOpen, onClose, onSubmit, mode = 'create', initialData = null, title = '할 일 작성하기' }) => {

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>

        <TextArea placeholder="할 일을 입력하세요..." defaultValue={initialData?.content || ''} />

        <ButtonContainer>
          <Button onClick={onClose}>취소</Button>
          <Button $primary onClick={onSubmit}>
            {mode === 'create' ? '등록' : '수정'}
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TodoModal;