import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import { useAuthContext } from "../../../context/AuthContext";
import { api } from "../../../util/api";
import toast from "react-hot-toast";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isToggle, toggle] = useToggle(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/api/auth/signin", formData);
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      login();
      navigate("/");
      toast.success("Sign success");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.error);
      setError(error.response.data.error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-1 basis-1/2 bg-slate-800 text-slate-50">
      <div className="w-[50%]  flex items-center justify-center">
        <div className="wrapper w-[50%]  ">
          <h1 className="text-2xl mb-16 font-bold text-center">Login your Account</h1>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="">
              <label className="block text-sm mb-1" htmlFor="">
                Email
              </label>
              <input
                disabled={loading}
                className="w-full rounded-md  bg-inherit border  outline-none focus-within:ring focus-within:ring-violet-600  py-2 px-3"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Eg. anoop@gmail.com"
                onFocusCapture={() => setError(null)}
              />
            </div>
            <div className="">
              <label className="block text-sm mb-1" htmlFor="">
                Password
              </label>
              <div className="flex items-center w-full rounded-md  bg-inherit border  outline-none focus-within:ring focus-within:ring-violet-600  py-2 px-3 ">
                <input
                  disabled={loading}
                  className="w-full rounded-md  bg-inherit   outline-none "
                  type={!isToggle ? "password" : "text"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Eg. welcome"
                  onFocusCapture={() => setError(null)}
                />
                <Icon
                  className="text-2xl cursor-pointer"
                  onClick={toggle}
                  icon={isToggle ? "iconamoon:eye" : "iconamoon:eye-off"}
                />
              </div>
            </div>
            <button disabled={loading} className="w-full bg-violet-600 py-2 rounded-md text-white">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
          {error && (
            <span className="text-sm mt-6 p-2 w-full text-center block border rounded-md border-red-400 text-red-400">
              {error}
            </span>
          )}
          <Link to={"/signup"}>
            <span className="text-sm mt-6 text-center block  text-blue-400">
              Not having your account? Signup here.
            </span>
          </Link>
        </div>
      </div>{" "}
      <div className="w-[50%] h-screen">
        <img
          className="w-full h-full object-cover object-center"
          src="/signin.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Signin;
