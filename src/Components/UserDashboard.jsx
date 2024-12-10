import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import logo from "../assets/logo.jpg";
import { FaBell } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { AiFillExclamationCircle } from "react-icons/ai"; // Icon for the alert
import axios from "axios";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { MyAlerts } from "../api/alert";

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts from the API
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
       MyAlerts()
      // axios
      //   .get("http://192.168.1.8:5000/api/alert/my-alerts", {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
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

  return (
    <div className="poppins flex flex-col md:flex-row min-h-screen bg-zinc-200">
      {/* Sidebar */}
      {!isSidebarOpen && (
        <button
          className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
          onClick={() => setIsSidebarOpen(true)} // Open the sidebar
        >
          <TiThMenu className="" />
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
            <IoMdCheckmarkCircleOutline className="font-bold text-xl " />
            Mark Attendance
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
            className="px-4 py-2 mt-96 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
          >
            <FaPowerOff className="font-thin text-xl " />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        <div className="overflow-x-auto rounded-lg flex flex-wrap  gap-6 p-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert._id}
                className="bg-zinc-50 p-4 mb-4 w-96  shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-white duration-300 ease-in-out"
              >
                <h3 className="font-semibold text-blue-800 text-2xl">
                  {alert.title}
                </h3>
                <p className="text-zinc-600 tracking-tight leading-tight mt-5 text-base">
                  {alert.message}
                </p>
                <p className="text-sm text-zinc-500 mt-2">
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
