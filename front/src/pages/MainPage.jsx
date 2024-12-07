import TodoPage from "./TodoPage.jsx";
import Calendar from "./Calendar.jsx";
import styled from "styled-components";

const MainContainer = styled.main`
    display: flex;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    gap: 20px;
    padding: 20px;
`

const MainPage = () => {
  return (
      <MainContainer>
        <Calendar/>
        <TodoPage/>
      </MainContainer>
  )
}

export default MainPage