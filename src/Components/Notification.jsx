

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDashboardCustomize, MdMessage } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import logo from '../assets/logo.jpg';
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { AllALerts, GenerateAlert } from "../api/alert";
import { AllEmployee } from "../api/auth";

const Notification = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAlert, setNewAlert] = useState({ title: "", message: "", targetUser: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDashboard = () => navigate("/dashboard");
  const handleAttendance = () => navigate("/allattendance");
  const handleUserDetails = () => navigate("/reg");
  const handleDownload = () => {  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleNotification = () => navigate("/notifications");
  const handleLeave = () => navigate("/employeeleaves");

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token missing");

      const response = await AllALerts()
      // axios.get("http://192.168.1.8:5000/api/alert/all", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      if (response.data.success) {
        setAlerts(response.data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token missing");

      const response = await  AllEmployee()
      // axios.get("http://192.168.1.8:5000/api/auth/all", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // console.log(response.data);
        setEmployees(response.data.users);

      if (response.data.success) {
        setEmployees(response.data.users); // Assuming the API returns an array of employee objects
      } else {
        throw new Error("Failed to fetch employees");
      }
    } catch (err) {
      console.log(err);
      //alert(err.message || "Failed to fetch employees");
     
    }
  };

  const handleCreateAlert = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token missing");

      const response = await GenerateAlert(newAlert)
      //  axios.post(
      //   "http://192.168.1.8:5000/api/alert",
      //   {
      //     ...newAlert,
      //     targetUser: newAlert.targetUser === "all" ? null : newAlert.targetUser, // Send null for "For All" option
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      if (response.data.success) {
        setAlerts([response.data.data, ...alerts]);
        setShowModal(false);
        setNewAlert({ title: "", message: "", targetUser: "" });
      } else {
        throw new Error("Failed to create alert");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAlerts();
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
      {/* Sidebar (same as before) */}
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
  className={`fixed top-0 left-0 z-10 w-64 bg-white text-black px-6 transition-transform ${
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
            className="px-4 py-2  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-start"
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
            className="py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-center gap-2"
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
            className=" px-4 py-2 mt-40 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
          >
            <FaPowerOff className="font-thin text-xl " />
            Logout
          </button>

         
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-5 md:ml-64">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="table-auto w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-blue-200 text-blue-800">
                <th className="px-4 py-2">Sent at</th>
                <th className="px-4 py-2">Sent to</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Message</th>
              </tr>
            </thead>
            {/* <tbody>
              {alerts.map((alert) => (
                <tr key={alert._id} className="border-b text-center">
                  <td className="px-4 py-2">{new Date(alert.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">{alert.targetUser || "For All"}</td>
                  <td className="px-4 py-2">{alert.title}</td>
                  <td className="px-4 py-2">{alert.message}</td>
                </tr>
              ))}
            </tbody> */}
            <tbody>
  {alerts.map((alert) => {
    const targetEmployee = employees.find(emp => emp._id === alert.targetUser); // Find the employee by _id
    const targetName = targetEmployee ? targetEmployee.name : "For All"; // Default to "For All" if no match
    return (
      <tr key={alert._id} className="border-b text-center">
        <td className="px-4 py-2">{new Date(alert.createdAt).toLocaleString()}</td>
        <td className="px-4 py-2">{targetName}</td>
        <td className="px-4 py-2">{alert.title}</td>
        <td className="px-4 py-2">{alert.message}</td>
      </tr>
    );
  })}
</tbody>

          </table>
        )}
      </div>

      <button onClick={() => setShowModal(true)} className="py-2 px-5 bg-blue-600 text-white rounded-full hover:bg-blue-700 absolute bottom-10 right-20 flex justify-evenly items-center gap-3">
        <MdMessage className="font-bold text-xl" /> Generate Alert
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded shadow p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Alert</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                className="border rounded p-2"
              />
              <textarea
                placeholder="Message"
                value={newAlert.message}
                onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                className="border rounded p-2"
              />
              <select
                value={newAlert.targetUser}
                onChange={(e) => setNewAlert({ ...newAlert, targetUser: e.target.value })}
                className="border rounded p-2"
              >
                <option value="all">For All</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={handleCreateAlert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;



