


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import logo from "../assets/logo.jpg";
import { FaBell } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";
import { RiShieldUserLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { MyAlerts } from "../api/alert";

function UserDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      MyAlerts()
        .then((response) => {
          if (response.data.success) {
            setAlerts(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching alerts:", error);
        });
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleUserDashboard = () => {
    navigate("/user");
  };

  const handleLeaveStatus = () => {
    navigate("/leave");
  };

  const handleMarkAttendance = () => {
    navigate("/userattendance");
  };

  const Myattendance = () => {
    navigate("/myattendance");
  };

  
  const renderAlertMessage = (message) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g; 
    const parts = message.split(linkRegex);
    return parts.map((part, index) =>
      linkRegex.test(part) ? (
        <a
          key={index}
          href={part}
          className="text-blue-500 underline hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      ) : (
        <span key={index} className="text-zinc-600">
          {part}
        </span>
      )
    );
  };

  return (
    <div className="poppins flex flex-col md:flex-row min-h-screen bg-zinc-200">
      {/* Sidebar */}
      {!isSidebarOpen && (
        <button
          className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <TiThMenu className="" />
        </button>
      )}

      <div
        className={`fixed top-0 left-0 z-10 w-64 bg-white h-screen text-black px-6 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="lg:hidden mt-2 text-black rounded hover:bg-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RxCross1 className="font-thin" />
        </button>
        <div className="mr-4">
          <img className="h-[100px] object-cover" src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-4 mt-16">
          <button className="px-1 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-center">
            <FaBell className="font-bold text-xl" />
            All Notifications
          </button>
          <button
            onClick={handleMarkAttendance}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 tracking-tighter hover:text-black duration-300 flex justify-evenly items-center"
          >
            <IoMdCheckmarkCircleOutline className="font-bold text-xl" />
            Mark Attendance
          </button>
          <button
            onClick={Myattendance}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black tracking-tighter  duration-300 flex justify-evenly items-center"
          >
            <RiShieldUserLine className="text-xl" />
            My Attendances
          </button>
          <button
            onClick={handleLeaveStatus}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
          >
            <BiSolidCalendarExclamation className="font-bold text-xl" />
            Leave Status
          </button>
          <button
            onClick={handleLogOut}
            // className="px-4 py-2 mt-20 bg-red-500 text-white rounded hover:bg-red-700 flex justify-center items-center gap-3"
            className="px-4 py-2 mt-16 bg-gradient-to-r from-red-500 to-red-700 text-white rounded hover:from-red-600 hover:to-red-800 flex justify-center items-center gap-3 transition-all duration-300"

          >
            <FaPowerOff className="font-thin text-xl" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative md:ml-64">
        <div className="overflow-x-auto rounded-lg flex flex-wrap gap-6 p-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert._id}
                className="bg-white p-4 mb-4 w-96 shadow-md rounded-lg transition-transform transform  hover:shadow-lg hover:bg-white hover:scale-105 duration-500 ease-in-out"
              >
                <h3 className="font-semibold text-blue-800 text-2xl">
                  {alert.title}
                </h3>
                <p className="tracking-tight leading-tight mt-5 text-base">
                  {renderAlertMessage(alert.message)}
                </p>
                <p
                  className={`${
                    alert.targetUser
                      ? "text-yellow-700 mt-2 text-sm"
                      : "text-zinc-500 mt-2 text-sm"
                  }`}
                >
                  {alert.targetUser ? "For You" : "For All"} -{" "}
                  {new Date(alert.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No alerts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
