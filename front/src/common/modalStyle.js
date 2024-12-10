import styled from 'styled-components';

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: ${props => props.$width || '500px'};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
`;

export const Button = styled.button`
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

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;