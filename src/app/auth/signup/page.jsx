import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import { useAuthContext } from "../../../context/AuthContext";
import { api } from "../../../util/api";
import toast from "react-hot-toast";

function Signup() {
  const [isToggle, toggle] = useToggle(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const [error, setError] = useState(null);
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
      const response = await api.post("/api/auth/signup", formData);
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      login();
      navigate("/");
      toast.success("Signup success");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-1 basis-1/2 bg-slate-800 text-slate-50">
      <div className="md:w-[50%]  flex items-center justify-center">
        <div className="wrapper max-sm:p-2 max-sm:pt-4 md:w-[50%]  ">
          <h1 className="text-2xl mb-16 font-bold text-center">Create your account</h1>

          <form className="space-y-6" onSubmit={handleFormSubmit} disabled={loading}>
            <div className="">
              <label className="block text-sm mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                className={`w-full rounded-md  bg-inherit border  outline-none focus-within:ring focus-within:ring-violet-600  py-2 px-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Eg. Anoop "
                onFocusCapture={() => setError(null)}
                required
              />
            </div>

            <div className="">
              <label className="block text-sm mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                className={`w-full rounded-md  bg-inherit border  outline-none focus-within:ring focus-within:ring-violet-600  py-2 px-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Eg. Singh"
                onFocusCapture={() => setError(null)}
                required
              />
            </div>
            <div className="">
              <label className="block text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                className={`w-full rounded-md  bg-inherit border  outline-none focus-within:ring focus-within:ring-violet-600  py-2 px-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Eg. anoop4735@gmail.com"
                onFocusCapture={() => setError(null)}
                required
              />
            </div>
            <div className="">
              <label className="block text-sm mb-1" htmlFor="">
                Password
              </label>
              <div
                className={`flex items-center w-full rounded-md  bg-inherit border  outline-none focus-within:ring focus-within:ring-violet-600  py-2 px-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  className={`w-full rounded-md  bg-inherit   outline-none ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type={!isToggle ? "password" : "text"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Eg. welcome"
                  onFocusCapture={() => setError(null)}
                  required
                />
                <Icon
                  className="text-2xl cursor-pointer"
                  onClick={toggle}
                  icon={isToggle ? "iconamoon:eye" : "iconamoon:eye-off"}
                />
              </div>
            </div>
            <button
              className={`w-full bg-violet-600 py-2 rounded-md text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {loading ? "Submitting" : "Submit"}
            </button>
          </form>
          {error && (
            <span className="text-sm mt-6 p-2 w-full text-center block border rounded-md border-red-400 text-red-400">
              {error}
            </span>
          )}
          <Link to={"/signin"}>
            <span className="text-sm mt-6 text-center block  text-blue-400">
              Already having your Account? Signin Here.
            </span>
          </Link>
        </div>
      </div>{" "}
      <div className="w-[50%] h-screen max-sm:hidden">
        <img
          className="w-full h-full object-cover object-center"
          src="./signin.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Signup;
