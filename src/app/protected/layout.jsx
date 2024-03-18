import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Dashboard from "../../components/shared/Dashboard";
import Navbar from "../../components/shared/Navbar";
import { useAuthContext } from "../../context/AuthContext";
import { QueryProvider } from "../../context/QueryContext";

function ProtectedLayout() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <QueryProvider>
      <div className="bg-slate-100 relative flex min-h-screen">
        <Dashboard className="sticky top-0 left-0  max-sm:hidden" />
        <div className="w-full md:ml-2 mt-1 relative">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </QueryProvider>
  );
}

export default ProtectedLayout;
