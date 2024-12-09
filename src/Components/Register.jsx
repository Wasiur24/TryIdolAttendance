
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useEffect } from 'react';

function Register() {

 
   const [error , setError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
    
      navigate("/");
    }
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeId: '',
    position: '',
    userType: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
     
      const token = localStorage.getItem('token');
      
     
      if (!token) {
        setError('No token found. Please log in first.');
        return;
      }
  
    
      const response = await axios.post('http://192.168.121.182:5000/api/auth/register', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        navigate('/usercreated'); 
      }
    } catch (error) {
      console.error('Error during registration:', error);
  
      
      if (error.response) {
        console.log('Response error data:', error.response.data);
        console.log('Response error status:', error.response.status);
        console.log('Response error headers:', error.response.headers);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
  
      
      setError('Registration failed. Please try again.');
    }
  };
  
  
  

  return (



    
    <div className="min-h-screen poppins flex items-center justify-center bg-gradient-to-r from-blue-100 to-cyan-600">
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full animate__animated animate__fadeIn">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="******"
                required
              />
            </div>

            {/* Employee ID */}
            <div>
              <label htmlFor="employeeId" className="block text-gray-700">Employee ID</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="EMP12345"
                required
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-gray-700">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Developer"
                required
              />
            </div>

            {/* User Type Dropdown */}
            <div>
              <label htmlFor="userType" className="block text-gray-700">User Type</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
