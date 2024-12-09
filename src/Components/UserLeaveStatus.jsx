

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPowerOff, FaPlus } from "react-icons/fa";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import logo from "../assets/loga.png";
import logo from '../assets/logo.jpg';
import { FaBell } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";

function UserLeaveStatus() {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]); // Store all leave requests
  const [newLeaveRequest, setNewLeaveRequest] = useState({ subject: "", message: "", status: "New" }); // For a new leave request
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login page if no token
    } else {
      fetchLeaveStatus();
    }
  }, []);

  const fetchLeaveStatus = async () => {
    try {
      const response = await axios.get("http://192.168.1.17:5000/api/leave/my-leaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const formattedLeaves = response.data.data.map((leave) => ({
          subject: leave.subject,
          message: leave.message,
          status: leave.status,
        }));
        setLeaveRequests(formattedLeaves);
      }
    } catch (error) {
      console.error("Error fetching leave status:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    setNewLeaveRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRequestLeave = async () => {
    if (!newLeaveRequest.subject || !newLeaveRequest.message) {
      alert("Please enter both Subject and Message.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.17:5000/api/leave/",
        newLeaveRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Leave request sent successfully!");
      fetchLeaveStatus(); // Fetch updated leave status
      setNewLeaveRequest({ subject: "", message: "", status: "New" }); // Clear the form
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error sending leave request:", error);
      alert("Failed to send leave request. Please try again.");
    }
  };

  const addNewLeaveRequest = () => {
    setShowModal(true); // Open modal when "Apply for Leave" is clicked
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
      {/* <div
        className={`absolute md:relative z-10 w-64 bg-white text-white px-6 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="md:hidden mb-4 text-white bg-blue-500 px-3 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Toggle Menu
        </button> */}
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
        <div className="flex flex-col gap-4 mt-16">
          <button
            onClick={handleUserDashboard}
            className="px-1 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center"
          >
            <FaBell className="font-bold text-xl" /> All Notifications
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
            className="px-4 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-center gap-3"
          >
            <BiSolidCalendarExclamation className="font-bold text-xl" />
            Leave Status
          </button>
          <button
            onClick={handleLogOut}
            className=" px-4 py-2 mt-96 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
          >
            <FaPowerOff className="font-thin text-xl " />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto text-center">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Message</th>
                {/* <th className="px-4 py-2">Actions</th> */}
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2">{leave.subject}</td>
                  <td className="px-4 py-2">{leave.message}</td>
                  {/* <td className="px-4 py-2">-</td> */}
                  <td className="px-4 py-2">{leave.status}</td>
                </tr>
              ))}
              {newLeaveRequest.subject && (
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-2">{newLeaveRequest.subject}</td>
                  <td className="px-4 py-2">{newLeaveRequest.message}</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2">{newLeaveRequest.status}</td>
                </tr>
              )}
              <tr>
                <td colSpan={4} className="px-4 py-2 absolute right-10 mt-4">
                  <button
                    onClick={addNewLeaveRequest}
                    className="bg-blue-600 text-white px-7 py-2 rounded-full flex justify-center items-center gap-2"
                  >
                    <FaPlus /> Apply for Leave
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Apply Leave */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl mb-4">Apply for Leave</h3>
            <div className="mb-4">
              <label className="block text-lg mb-2">Subject</label>
              <input
                type="text"
                value={newLeaveRequest.subject}
                onChange={(e) =>
                  handleInputChange("subject", e.target.value)
                }
                className="border px-2 py-1 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Message</label>
              <textarea
                value={newLeaveRequest.message}
                onChange={(e) =>
                  handleInputChange("message", e.target.value)
                }
                className="border px-2 py-1 w-full rounded"
                rows="4"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestLeave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLeaveStatus;




