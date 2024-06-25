import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "../pages/default";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import Registration from "../pages/registration";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Forum } from "../pages/forum";
import ForumAnswer from "../pages/forumAnswer";

import { Profile } from "../pages/profile";

import { AuthProvider } from "../config/auth/AuthProvider";
import { PrivateRoutes } from "../config/privateRoutes";
import { DataProvider } from "../config/data/DataProvider";
import { ChatBot } from "../components/ChatBot";

const Container = styled.main`
  height: 100dvh;
`;

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Container>
            <Header />
            <Routes>
              <Route path="/" element={<Default />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />

              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/home" element={<Home />} />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/forum-answer" element={<ForumAnswer />} />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/forum" element={<Forum />} />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
            <ChatBot />
          </Container>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};
