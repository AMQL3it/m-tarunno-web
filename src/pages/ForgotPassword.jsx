import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/two-factor-authentication-animate.svg";
import authService from "../services/authService";
import SweetAlert from "../utils/SweetAlert";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier) {
      setError("Please enter your email or username.");
      return;
    }

    try {
      const response = await authService.forgotPassword({ identifier });

      if (response.success) {
        SweetAlert.successAlert("Reset code sent successfully!");
        navigate("/varification", { state: { identifier } });
      } else {
        setError(response.message || "Failed to send reset code.");
      }
    } catch (err) {
      console.error("Error:", err);
      SweetAlert.errorAlert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#1D1D1D] text-white">
      <div className="w-full max-w-xs text-center border border-gray-700 rounded-lg shadow-md bg-[#2C2C2C] p-6">
        <img
          src={logo}
          alt="Forgot Password"
          className="w-40 mx-auto mb-3 border border-gray-600 rounded shadow"
        />
        <h3 className="text-lg font-semibold mb-3">Forgot Password?</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your email or username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
              error ? "border-red-500" : "border-gray-700"
            } rounded focus:outline-none focus:ring-2 ${
              error ? "focus:ring-red-500" : "focus:ring-green-500"
            }`}
          />
          {error && <p className="text-xs text-red-500 text-left">{error}</p>}

          <button
            type="submit"
            className="px-3 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
