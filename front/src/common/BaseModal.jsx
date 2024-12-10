import { ModalContent, ModalOverlay, ModalTitle } from './modalStyle.js';

const BaseModal = ({ isOpen, onClose, title, width, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} $width={width}>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default BaseModal;