import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/sign-in-animate.svg";
import authService from "../services/authService";
import SweetAlert from "../utils/SweetAlert";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (errors.username || errors.password) {
      setErrors({ username: "", password: "" });
    }
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = userInfo;

    setErrors({ username: "", password: "" }); // Reset error states

    if (!username || !password) {
      setErrors({
        username: !username ? "Username or email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    try {
      const response = await authService.login({
        identifier: username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        const payload = response.data.token.split(".")[1];
        const decoded = JSON.parse(atob(payload));

        if (decoded.role === "user") {
          navigate("/");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Server error:", error);
      // console.log(error.response.data.error);
      SweetAlert.errorAlert(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#1D1D1D] text-white">
      <div className="w-full max-w-xs text-center border border-gray-700 rounded-lg shadow-md bg-[#2C2C2C] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src={logo}
          alt="Login Illustration"
          onClick={() => navigate("/")}
          className="w-40 m-4 mx-auto border border-gray-600 rounded shadow"
        />
        <div className="px-6 pb-6 pt-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Sign in</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username Input */}
            <>
              <input
                type="text"
                placeholder="Username or email address"
                value={userInfo.username}
                name="username"
                onChange={handleChange}
                className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                  errors.username ? "border-red-500" : "border-gray-700"
                } rounded focus:outline-none focus:ring-2 ${
                  errors.username
                    ? "focus:ring-red-500"
                    : "focus:ring-green-500"
                }`}
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  {errors.username}
                </p>
              )}
            </>

            {/* Password Input */}
            <>
              <input
                type="password"
                placeholder="Password"
                value={userInfo.password}
                name="password"
                onChange={handleChange}
                className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } rounded focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-green-500"
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  {errors.password}
                </p>
              )}
            </>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Sign in
            </button>

            {/* Forgot Password Link */}
            <Link
              to="/forgot-password"
              className="text-sm text-gray-300 hover:text-gray-400"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
