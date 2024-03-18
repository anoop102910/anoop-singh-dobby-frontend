import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function AuthLayout() {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

export default AuthLayout;
