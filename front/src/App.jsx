import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { DateProvider } from './contexts/DateContext.jsx';

const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        font-family: 'Noto Sans KR', sans-serif;
    }
`;

const MainPage = lazy(() => import('./pages/MainPage.jsx'));

const Loading = () => <h3>Loading ...</h3>;

function App() {
  return (
    <BrowserRouter>
      <DateProvider>
        <GlobalStyle />

        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          } />

          <Route index element={
            <Suspense fallback={<Loading />}>
              <MainPage />
            </Suspense>
          } />
        </Routes>
      </DateProvider>
    </BrowserRouter>
  );
}

export default App;
