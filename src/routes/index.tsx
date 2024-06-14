import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "../pages/default";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import Registration from "../pages/registration";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Forum } from "../pages/forum";
import ForumAnswer from "../pages/forumAnswer";

const Container = styled.main`
  height: 100dvh;
`;

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header logged={true} username="Laura" />
        <Routes>
          <Route path="/" element={<Default />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum-answer" element={<ForumAnswer />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
