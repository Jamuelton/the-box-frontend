import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "../pages/default";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
      </Routes>
    </BrowserRouter>
  );
};
