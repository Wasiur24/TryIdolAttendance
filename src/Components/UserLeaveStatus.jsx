import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff, FaPlus } from "react-icons/fa";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { createLeave, Myleave } from "../api/leave";
import logo from '../assets/logo.jpg';
import { RiShieldUserLine } from "react-icons/ri";

import { FaBell } from "react-icons/fa";
function UserLeaveStatus() {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]); //saari leaves aayengi....table me map lagega
  const [newLeaveRequest, setNewLeaveRequest] = useState({ subject: "", message: "", status: "New" }); // modal me new leave banao
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); 

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
      const response = await Myleave(); //API CALL HUI HAI YAHA SE
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
      await createLeave(newLeaveRequest);
      fetchLeaveStatus(); 
      setNewLeaveRequest({ subject: "", message: "", status: "New" }); // Clear the form
      setShowModal(false); 
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
  const Myattendance = () => {
    navigate("/myattendance");
  };


  return (
    <div className="poppins flex flex-col md:flex-row min-h-screen bg-zinc-200">
      {/* Sidebar */}
      {!isSidebarOpen && ( //side bar is not open,to jaise click kro open ho
        <button
          className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <TiThMenu />
        </button>
      )}
      <div
        className={`fixed top-0 left-0 h-screen z-10 w-64 bg-white text-black px-6 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="lg:hidden mt-2 text-black rounded hover:bg-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RxCross1 />
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

          {/* <button
                onClick={Myattendance}
              className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
                      >
                        <RiShieldUserLine className="font-bold text-xl" />
                        My Attendances
                      </button> */}
         
          <button
            onClick={handleMarkAttendance}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 tracking-tighter hover:text-black duration-300 flex justify-evenly items-center"
          >
             
            <IoMdCheckmarkCircleOutline className="font-bold text-xl" />
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
            className=" px-4 py-2 mt-72 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
          >
            <FaPowerOff className="font-thin text-xl" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto text-center">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2">{leave.subject}</td>
                  <td className="px-4 py-2">{leave.message}</td>
                  <td className="px-4 py-2">{leave.status}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="px-4 py-2 absolute right-10 mt-4">
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
                onClick={() => setShowModal(false)}   //modal gayab
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





