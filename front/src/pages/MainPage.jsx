import TodoPage from './TodoPage.jsx';
import Calendar from './Calendar.jsx';
import styled from 'styled-components';

const MainContainer = styled.main`
    display: flex;
    flex-direction: column; // 기본적으로 세로 정렬
    width: 100%;
    max-width: 1400px;
    height: calc(100vh - 40px);
    margin: 0 auto;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;

    @media (min-width: 768px) {
        // 태블릿 이상에서는 가로 정렬
        flex-direction: row;
    }
`;

const MainPage = () => {
  return (
    <MainContainer>
      <Calendar />
      <TodoPage />
    </MainContainer>
  );
};

export default MainPage;