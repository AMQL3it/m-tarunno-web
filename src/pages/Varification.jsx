import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/enter-otp-animate.svg";
import authService from "../services/authService";
import SweetAlert from "../utils/SweetAlert";

const Varification = () => {
  const location = useLocation();
  const identifier = location.state?.identifier;
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60); // Countdown from 60s
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [errors, setErrors] = useState("");

  // Timer Countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      setErrors("Please enter a valid 6-digit code.");
      return;
    }

    try {
      const response = await authService.codeVerify({ identifier, code });

      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } else {
        setAttemptsLeft((prev) => prev - 1);
        if (attemptsLeft - 1 <= 0) {
          SweetAlert.errorAlert("Too many failed attempts. Please try later.");
        } else {
          SweetAlert.errorAlert(
            response.message || "Invalid verification code."
          );
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      SweetAlert.errorAlert("Something went wrong. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      const response = await authService.codeSending({ identifier });
      if (response.success) {
        SweetAlert.successAlert("Code resent successfully!");
        setTimer(60);
        setResendEnabled(false);
      } else {
        SweetAlert.errorAlert(response.message || "Failed to resend code.");
      }
    } catch (error) {
      SweetAlert.errorAlert("Server error while resending code.");
      console.error("Resend error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-[#1D1D1D] text-white">
      <div className="max-w-xs w-full text-center border border-gray-700 rounded-lg shadow-md bg-[#2C2C2C] p-6">
        <img
          src={logo}
          alt="Verification"
          className="w-48 mx-auto mb-3 border border-gray-600 rounded shadow"
        />
        <h3 className="text-lg font-semibold mb-2">Verification Code</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Identifier (disabled) */}
          {/* <input
            type="text"
            value={identifier}
            readOnly
            disabled
            className="px-3 py-2 text-sm bg-[#1F1F1F] text-white border border-gray-700 rounded"
          /> */}

          {/* Code Input */}
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
              errors ? "border-red-500" : "border-gray-700"
            } rounded focus:outline-none focus:ring-2 ${
              errors ? "focus:ring-red-500" : "focus:ring-green-500"
            }`}
          />
          {errors && <p className="text-xs text-red-500 text-left">{errors}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={attemptsLeft <= 0}
            className="px-3 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Confirm
          </button>
        </form>

        {/* Attempts info */}
        <p className="text-sm mt-2 text-yellow-400">
          Attempts left: {attemptsLeft}
        </p>

        {/* Timer + Resend */}
        <div className="text-sm mt-2">
          {resendEnabled ? (
            <button
              onClick={handleResend}
              className="text-blue-400 hover:underline"
            >
              ⏳ Resend Code
            </button>
          ) : (
            <span className="text-gray-400">Resend in {timer}s</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Varification;
