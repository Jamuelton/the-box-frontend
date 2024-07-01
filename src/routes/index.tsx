import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../pages/login";
import { Home } from "../pages/home";
import Registration from "../pages/registration";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Forum } from "../pages/forum";
import ForumAnswer from "../pages/forumAnswer";
import { LabSchedule } from "../pages/labSchedule/index";

import { Profile } from "../pages/profile";

import { AuthProvider } from "../config/auth/AuthProvider";
import { PrivateRoutes } from "../config/privateRoutes";
import { DataProvider } from "../config/data/DataProvider";
import { ChatBot } from "../components/ChatBot";
import { Material } from "../pages/material";
import { Documents } from "../pages/documents";
import { AcademicCalendar } from "../pages/academicCalendar";
import { AddCalendar } from "../pages/AddCalendar";
import { LocalCommerce } from "../pages/localCommerce";
import { LockerRoutes } from "../config/lockerRoutes";
import LabSchedulingConfirmationListing from "../pages/labSchedulingConfirmationListing";

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
              <Route element={<LockerRoutes redirectPath="/" />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<LockerRoutes redirectPath="/" />}>
                <Route path="/register" element={<Registration />} />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/" element={<Home />} />
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
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/material" element={<Material />} />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/documents" element={<Documents />} />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/lab-schedule" element={<LabSchedule />} />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route
                  path="/academic-calendar"
                  element={<AcademicCalendar />}
                />
              </Route>
              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route path="/add-calendar" element={<AddCalendar />} />
                <Route path="/localCommerce" element={<LocalCommerce />} />
              </Route>

              <Route element={<PrivateRoutes redirectPath="/login" />}>
                <Route
                  path="/lab-scheduling-confirmation"
                  element={<LabSchedulingConfirmationListing />}
                />
              </Route>
            </Routes>
            <ChatBot />
          </Container>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};
