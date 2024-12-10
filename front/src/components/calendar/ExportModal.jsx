import styled from 'styled-components';
import BaseModal from '../../common/BaseModal.jsx';
import { FiCalendar, FiFileText } from 'react-icons/fi';
import { BsFileExcel, BsFiletypePdf } from 'react-icons/bs';

export const ExportButton = styled.button`
    width: 100%;
    padding: 12px;
    margin-bottom: 8px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const ExportModal = ({ isOpen, onClose, onExport }) => {

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="내보내기"
      width="300px"
    >
      <ExportButton onClick={() => onExport('excel', 'monthly')}>
        <BsFileExcel />
        <FiCalendar />
        월별 엑셀로 내보내기
      </ExportButton>
      <ExportButton onClick={() => onExport('excel', 'daily')}>
        <BsFileExcel />
        <FiFileText />
        일별 엑셀로 내보내기
      </ExportButton>
      <ExportButton onClick={() => onExport('pdf', 'monthly')}>
        <BsFiletypePdf />
        <FiCalendar />
        월별 PDF로 내보내기
      </ExportButton>
      <ExportButton onClick={() => onExport('pdf', 'daily')}>
        <BsFiletypePdf />
        <FiFileText />
        일별 PDF로 내보내기
      </ExportButton>
    </BaseModal>
  );
};

export default ExportModal;