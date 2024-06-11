import { FC } from "react";
import { useAuth } from "../auth/UseAuth";
import { isAuth } from "../auth/Auth";
import { Navigate, Outlet } from "react-router-dom";

type TProps = {
  redirectPath: string;
};

export const PrivateRoutes: FC<TProps> = ({ redirectPath = "/login" }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated || isAuth() ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} />
  );
};
