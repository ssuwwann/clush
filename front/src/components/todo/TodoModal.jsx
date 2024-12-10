import styled from 'styled-components';
import BaseModal from '../../common/BaseModal.jsx';
import { Button, ButtonContainer } from '../../common/modalStyle.js';


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

const ImportanceSelector = styled.div`
    margin-bottom: 20px;
`;

const ImportanceLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #666;
`;

export const ImportanceInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 0;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: #000;
        border-radius: 50%;
        cursor: pointer;
        margin-top: -6px;
    }

    &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: #000;
        border-radius: 50%;
        cursor: pointer;
        border: none;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: #ddd;
        border-radius: 2px;
        cursor: pointer;
    }

    &::-moz-range-track {
        width: 100%;
        height: 4px;
        background: #ddd;
        border-radius: 2px;
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;
const ImportanceValue = styled.div`
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-top: 8px;
`;


const TodoModal = ({
                     isOpen,
                     onClose,
                     onChange,
                     onSubmit,
                     mode = 'create',
                     initialData = null,
                     title = '할 일 작성하기',
                   }) => {

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} width="500px">
      <TextArea
        placeholder="약속하세요."
        value={initialData?.description || ''}
        name="description"
        onChange={onChange}
        disabled={mode === 'view'}
      />

      {mode === 'view' ? null : (
        <>
          <ImportanceSelector>
            <ImportanceLabel>중요도</ImportanceLabel>
            <ImportanceInput
              type="range"
              min="0"
              max="9"
              value={initialData?.importance || '5'}
              name="importance"
              onChange={onChange}
            />
            <ImportanceValue>{Number(initialData?.importance) + 1}</ImportanceValue>
          </ImportanceSelector>

          <ButtonContainer>
            <Button onClick={onClose}>취소</Button>
            <Button
              onClick={() => mode === 'create' ? onSubmit() : onSubmit(initialData.id)}
              $primary
            >
              {mode === 'create' ? '등록' : '수정'}
            </Button>
          </ButtonContainer>
        </>
      )}
    </BaseModal>
  );
};

export default TodoModal;