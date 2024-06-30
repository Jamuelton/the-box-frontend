import { FC } from "react";
import { useAuth } from "../auth/UseAuth";
import { isAuth } from "../auth/Auth";
import { Navigate, Outlet } from "react-router-dom";

type TProps = {
  redirectPath: string;
};

export const LockerRoutes: FC<TProps> = ({ redirectPath = "/" }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated || isAuth() ? (
    <Navigate to={redirectPath} />
  ) : (
    <Outlet />
  );
};
