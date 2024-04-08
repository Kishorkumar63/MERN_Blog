import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser ? <Outlet /> : <Navigate to="/signin" />;
};
