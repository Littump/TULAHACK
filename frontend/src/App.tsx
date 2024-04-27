import { RouterProvider, createHashRouter } from "react-router-dom";
import MainLayout from "./ui/MainLayout.tsx";
import Error from "./ui/Error.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NewsPage from "@/pages/NewsPage.tsx";
import RegistrationPage from "@/pages/RegistrationPage.tsx";
import OrganizationsPage from "@/pages/OrganizationsPage.tsx";
import ChatPage from "@/pages/ChatPage.tsx";
import { Chat } from "@/modules/Chat";
import ProfilePage from "@/pages/ProfilePage.tsx";

const router = createHashRouter([
  {
    path: "/login",
    element: (
      <MainLayout title="Вход">
        <LoginPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: (
      <MainLayout title="Профиль">
        <ProfilePage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },

  {
    path: "/messenger",
    element: (
      <MainLayout title="Все сообщения">
        <ChatPage />
      </MainLayout>
    ),
    children: [
      {
        path: "/messenger/:id",
        element: <Chat />,
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/registration",
    element: (
      <MainLayout title="Регистрация">
        <RegistrationPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/",
    element: (
      <MainLayout title="Сообщество">
        <NewsPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/organizations",
    element: (
      <MainLayout title="Организации">
        <OrganizationsPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
