import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "../pages/default";
import { Login } from "../pages/login";
import Registration from "../pages/registration";
import { Forum } from "../pages/forum";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </BrowserRouter>
  );
};
