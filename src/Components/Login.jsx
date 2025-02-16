
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({   //here comes the form ka data
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
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
    setStatusMessage("Logging in..."); 

    try {
      
      const response = await login(formData);
      // console.log(formData.email)
      const { token, userType } = response.data;

      localStorage.setItem("token", token);

      
      setStatusMessage("Login Successful!");

     
      setTimeout(() => {
        if (userType === "admin") {
          navigate("/dashboard");
        } else if (userType === "user") {
          navigate("/user");
        } else {
          setError("Unknown user type.");
        }
      }, 2000); 
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
      setStatusMessage("Login Failed"); 
    }
  };

  return (
    <div className="min-h-screen sm:h-screen sm:w-screen w-full poppins bg-gradient-to-tl from-cyan-600 to-cyan-400
 flex items-center justify-center px-5">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-700 border-2 border-cyan-500  hover:shadow-2xl hover:scale-105">
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
                className="w-full px-4 py-3 poppins border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
                placeholder="example@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block poppins text-gray-700 text-base mb-2 font-medium"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 poppins relative py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
                placeholder="Abc@123"
                required
              />
              {/* Eye Icon */}
              <div
  className="absolute top-1/2 transform -translate-y-1/2 right-3 flex items-center cursor-pointer"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? (
    <FaEyeSlash className="text-gray-500 mt-8" />
  ) : (
    <FaEye className="text-gray-500 mt-8" />
  )}
</div>

            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Status Message */}
            {statusMessage && (
              <p
                className={`mt-2 text-sm ${
                  statusMessage.includes("Successful")
                    ? "text-yellow-500"
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
                className="px-6 py-2 w-full mt-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700  text-white font-semibold rounded-lg shadow-md transition duration-700 transform "
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


