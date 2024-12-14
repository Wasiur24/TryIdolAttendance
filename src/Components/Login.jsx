

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); //message ke lie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("Logging in..."); //by default message

    try {
      // Make API call
      const response = await login(formData);

      const { token, userType } = response.data;

      localStorage.setItem("token", token);

      // Show success message
      setStatusMessage("Login Successful!");

      // Redirect based on user type
      setTimeout(() => {
        if (userType === "admin") {
          navigate("/dashboard");
        } else if (userType === "user") {
          navigate("/user");
        } else {
          setError("Unknown user type.");
        }
      }, 2000); // Redirect after showing success message
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
      setStatusMessage("Login Failed"); // Show failure message
    }
  };

  return (
    <div className="min-h-screen poppins bg-gradient-to-r from-teal-100 to-cyan-700 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block poppins text-gray-700 text-base mb-2 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 poppins border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="example@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block poppins text-gray-700 text-base mb-2 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 poppins py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Abc@123"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Status Message */}
            {statusMessage && (
              <p
                className={`mt-2 text-sm ${
                  statusMessage.includes("Successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {statusMessage}
              </p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-6 py-2 w-full mt-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

