import { RouterProvider, createHashRouter } from 'react-router-dom';
import MainLayout from './ui/MainLayout.tsx';
import Error from './ui/Error.tsx';
import LoginPage from './pages/LoginPage.tsx';
import NewsPage from '@/pages/NewsPage.tsx';


const router = createHashRouter([
  {
    path: '/login',
    element: (
      <MainLayout title="Вход">
        <LoginPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/',
    element: (
      <MainLayout title="Сообщество">
        <NewsPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
