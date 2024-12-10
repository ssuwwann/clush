import styled from 'styled-components';
import Calendar from './Calendar.jsx';
import TodoPage from './TodoPage.jsx';

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
    height: calc(100vh - 40px);
    margin: 0 auto;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;

    @media (min-width: 768px) {
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