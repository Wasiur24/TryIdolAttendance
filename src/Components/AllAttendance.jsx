import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import logo from '../assets/logo.jpg';
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { getAllAttendance } from "../api/attendance";

const AllAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleDownload = () => {
    const csvHeader =
      "EmployeeId,Date,Check-in Time,Check-out Time,Location,Image,Description\n";
    const csvRows = attendanceRecords
      .map(
        (user) =>
          `${user.userId?.employeeId || "Unknown"},` +
          `${user?.checkin ? user.checkin.split("T")[0] : "N/A"},` +
          `${
            user?.checkin ? user.checkin.split("T")[1]?.split(".")[0] : "N/A"
          },` +
          `${
            user?.checkout ? user.checkout.split("T")[1]?.split(".")[0] : "N/A"
          },` +
          `"${user.location || "N/A"}",` + // Wrap location in quotes
          `${user.image || "N/A"},` +
          `${user.description || "N/A"}`
      )
      .join("\n");

    const csvData = csvHeader + csvRows;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_records.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleAttendance = () => navigate("/allattendance");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await 
        getAllAttendance()
        // axios.get(
        //   "http://192.168.1.8:5000/api/attendance",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        console.log(response.data);
        

        if (response.data.status === "success") {
          setAttendanceRecords(response.data.attendanceRecords);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleLeave=()=>{
    navigate('/employeeleaves');
  }
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleUserDetails = () => navigate("/reg");
  // const handleUserDetails = () => navigate("/register");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNotification=()=>{
    navigate('/notifications');
  }
  return (
    <div className="min-h-screen flex bg-gradient-to-r poppins from-zinc-200 to-zinc-100 poppins">
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
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-start"
          >
            <MdDashboardCustomize className="font-bold text-xl" /> Dashboard
          </button>
          <button
            onClick={handleAttendance}
            className="px-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300  flex justify-evenly items-start"
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

      {/* Main content */}
      {/* <div className="w-3/4 p-6 pl-24   overflow-y-auto"> */}
      <div className="ml-10 w-3/4 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          All Attendance Records
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-blue-200 text-blue-700 text-center">
              <tr>
                <th className="py-3 px-4 text-center">EmployeeID</th>
                <th className="py-3 px-4 text-center">Date</th>
                <th className="py-3 px-4 text-center">Check-in</th>
                <th className="py-3 px-4 text-center">Check-out</th>
                <th className="py-3 px-4 text-center">Location</th>
                <th className="py-3 px-4 text-center">Image</th>
                <th className="py-3 px-4 text-center">Description</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((record) => (
                  <tr
                    key={record._id}
                    className="border-b hover:bg-blue-50 text-center"
                  >
                    <td className="py-3 px-4 text-sm">
                      {record.userId?.employeeId || "Unknown"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {record?.checkin ? record.checkin.split("T")[0] : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {/* {record?.checkin ? record.checkin.split("T")[1]?.split(".")[0] : "N/A"} */}
                      { console.log(`checkin":${record?.checkin ? record.checkin.split("T")[1]?.split(".")[0] : "N/A"}`)}
                      {record?.checkin
                        ? new Date(record.checkin).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                     { console.log(`checkout":${record?.checkout ? record.checkout.split("T")[1]?.split(".")[0] : "N/A"}`)}
                      {/* {record?.checkout ? record.checkout.split("T")[1]?.split(".")[0] : "N/A"} */}
                      {record?.checkout
                        ? new Date(record.checkout).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {record.location || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm flex justify-center items-center">
                      {record.image ? (
                        <a
                          className="text-yellow-600"
                          href={`http://192.168.1.17:5000/images/${record.image}`}
                        >
                          View Image
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </td>
                    {/* <td className="py-3 px-4 text-sm flex justify-center items-center">
      {record.image ? (
        <img
          src={`http://192.168.121.182:5000/images/${record.image}`}
          alt="Attendance"
          onDoubleClick={handleDoubleClick}
          className={`w-16 h-16 object-cover rounded-full text-center transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
        />
      ) : (
        "No Image"
      )}
    </td> */}
                    <td className="py-3 px-4 text-sm text-left">
                      {record.description || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7" // Adjust colSpan to match the number of columns
                    className="text-center py-4 text-sm text-gray-600"
                  >
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAttendance;
