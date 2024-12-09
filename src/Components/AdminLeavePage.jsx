import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const AdminLeavePage = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchLeaves();
    }
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://192.168.1.17:5000/api/leave/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLeaves(response.data.data); // Assuming `data.data` holds the leave requests
    } catch (err) {
      setError("Failed to fetch leave requests");
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleNotification=()=>{
    navigate('/notifications');
  }

  const handleLeave=()=>{
    navigate('/employeeleaves');
  }

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleUserDetails = () => navigate("/reg");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAttendance = () => navigate("/allattendance");
  const handleDownload = () => navigate("/download");
  const handleLeaveAction = async (leaveId, action) => {
    try {
      await axios.put(
        `http://192.168.1.17:5000/api/leave/${leaveId}`,
        {
          status: action,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );
      fetchLeaves(); // Refresh the data after action
    } catch (err) {
      setError(`Failed to ${action} leave`);
    }
  };
  

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
            className="px-4 py-2  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-start"
          >
            <AiOutlineUserAdd className="font-bold text-xl" /> Add User
          </button>
          <button
            // onClick={handleDownload}
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
            className="py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-center gap-3"
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
      <div className="flex-1 p-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto text-center">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="px-4 py-2">Applicant Name</th>
                {/* <th className="px-4 py-2">Position</th> */}
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Status</th>
                {/* <th className="px-4 py-2">Approved By</th> */}
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-b">
                  <td className="px-4 py-2">{leave.userId.name}</td>
                  {/* <td className="px-4 py-2">{leave.userId.position}</td> */}
                  <td className="px-4 py-2">{leave.subject}</td>
                  <td className="px-4 py-2">{leave.message}</td>
                  <td className="px-4 py-2 capitalize">{leave.status}</td>
                  {/* <td className="px-4 py-2">
                    {leave.approvedBy ? leave.approvedBy.name : "N/A"}
                  </td> */}
                  <td className="px-4 py-2">
                    {leave.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleLeaveAction(leave._id, "approved")}
                          className="px-3 py-1 w-28 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleLeaveAction(leave._id, "rejected")}
                          className="px-3 py-1 w-28 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminLeavePage;


