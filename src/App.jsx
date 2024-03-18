import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import ProtectedLayout from "./app/protected/layout";
import Home from "./app/protected/home/page";
import AuthLayout from "./app/auth/layout";
import Layout from "./layout";
import Upload from "./app/protected/upload/page";
import Signup from "./app/auth/singup/page";
import Signin from "./app/auth/signin/page";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const { login } = useAuthContext();

  useEffect(() => {
    login();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
            </Route>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
