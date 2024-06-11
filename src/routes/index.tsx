import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "../pages/default";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import Registration from "../pages/registration";
import styled from "styled-components";
import { Header } from "../components/Header";
import ForumAnswer from "../pages/forumAnswer";
import { AuthProvider } from "../config/auth/AuthProvider";
import { PrivateRoutes } from "../config/privateRoutes";

const Container = styled.main`
  height: 100dvh;
`;

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route element={<PrivateRoutes redirectPath="/login" />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<PrivateRoutes redirectPath="/login" />}>
              <Route path="/forum-answer" element={<ForumAnswer />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};
