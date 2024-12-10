// import React from "react";
// import { useNavigate } from "react-router-dom";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useEffect } from 'react';
import { MdMessage } from "react-icons/md";
import logo from '../assets/logo.jpg';
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { register } from "../api/auth";

const Reg = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleAttendance = () => navigate("/allattendance");

  // const handleUserDetails = () => navigate("/register");
  const handleUserDetails = () => navigate("/reg");

  const handleDownload = () => {
    // Logic for download
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error , setError] = useState('')
  const handleNotification=()=>{
    navigate('/notifications');
  }

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
  
    
      const response = await 
      register(formData)
      // axios.post('http://192.168.1.8:5000/api/auth/register', formData, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      // });
  
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

  const handleLeave=()=>{
    navigate('/employeeleaves');
  }
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
      {/* Sidebar */}
     

      {/* <div
        className={`absolute md:relative z-10 w-64 bg-white text-white  px-6 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="lg:hidden mb-4 text-white bg-blue-500 px-3 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Toggle Menu
        </button > */}
         {!isSidebarOpen && (
    <button
      className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
      onClick={() => setIsSidebarOpen(true)} // Open the sidebar
    >
      <TiThMenu  className=""/>
    </button>
  )}

  <div
  className={`absolute md:relative z-10 w-64 bg-white text-black px-6 transition-transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0`}
>
  <button
    className="lg:hidden mt-2 text-black  rounded hover:bg-blue-600"
    onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle the state
  >
    <RxCross1 className="font-thin"/>
  </button>
        <div className="mr-4">
          <img className="h-[100px] object-cover" src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <button
            onClick={handleDashboard}
            className="px-4 py-2 text-center  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-start"
          >
            <MdDashboardCustomize className="font-bold text-xl" /> Dashboard
          </button>
          <button
            onClick={handleAttendance}
            className="px-1 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300  flex justify-evenly items-start"
          >
            <FaUsersViewfinder className="font-semibold text-2xl " />
            View All
          </button>
          <button
            onClick={handleUserDetails}
            className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-start"
          >
            <AiOutlineUserAdd className="font-bold text-xl" /> Add User
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center"
          >
            <HiOutlineDownload className="font-bold text-xl" />
            Download
          </button>

          <button
            onClick={handleNotification}
            className="py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-2"
          >
            <FaBell className="font-bold text-xl" />
             Alerts
          </button>

          <button
            onClick={handleLeave}
            className="py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
          >
            <SlCalender className="font-bold text-xl" />
            Leaves
          </button>

          

          <button
            onClick={handleLogOut}
            className=" px-4 py-2 mt-56 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
          >
            <FaPowerOff className="font-thin text-xl " />
            Logout
          </button>

         
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 py-10">
        {/* Main container left empty for register page */}
        <div className="bg-white p-8 mx-auto rounded-lg shadow-lg max-w-lg w-full animate__animated animate__fadeIn">
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
    </div>
  );
};

export default Reg;
