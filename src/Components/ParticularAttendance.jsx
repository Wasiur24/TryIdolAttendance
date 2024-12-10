import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
// import logo from '../assets/logo.jpg';
import logo from '../assets/logo.jpg';
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { particularAttendance } from "../api/attendance";

const ParticularAttendance = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  const { state } = useLocation(); 
  const { id } = useParams(); 

  const userName = state?.name || "Unknown User";
  const employeeId = state?.employeeId || "Unknown ID";

  const [attendanceData, setAttendanceData] = useState([ ]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAttendance = async () => {
      try {
        const response = await particularAttendance(id)
        // axios.get(
        //   `http://192.168.1.8:5000/api/attendance/${id}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        console.log(response.data);
        // Validate API response
        const fetchedData = Array.isArray(response.data.userAttendance)
          ? response.data.userAttendance
          : [];
        setAttendanceData(fetchedData);
      } catch (error) {
        console.log(error)
        console.error("Error fetching attendance data:", error);
        setAttendanceData([]);
      }
    };

    fetchAttendance();
  }, [id]); // Dependency array includes id

  const handleDownload = () => {
    // Define CSV headers
    const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";

    // Map attendanceData to CSV rows
    const csvRows = attendanceData
      .map(
        (record) =>
          `${record?.checkin ? record.checkin.split("T")[0] : "N/A"},` +
          `${
            record?.checkin
              ? new Date(record.checkin).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"
          },` +
          `${
            record?.checkout
              ? new Date(record.checkout).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"
          },` +
          `${record.location || "N/A"},` +
          `${record.userId || "N/A"}`
      )
      .join("\n");

    // Combine headers and rows
    const csvData = csvHeader + csvRows;

    // Create a Blob and download the file
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_data.csv";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  // const handleUserDetails = () => navigate("/register");
  const handleUserDetails = () => navigate("/reg");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleNotification=()=>{
    navigate('/notifications');
  }
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleLeave=()=>{
    navigate('/employeeleaves');
  }

  const handleAttendance = () => navigate("/allattendance");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
      {/* Sidebar */}
      <div
        className={`absolute md:relative z-10 w-64 bg-white text-white  px-6 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="lg:hidden mb-4 text-white bg-blue-500 px-3 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Toggle Menu
        </button >
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
      <div className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">
          {userName}'s Attendance Record
        </h1>
        <h1 className="mb-4 bg-blue-500 px-5 py-1 rounded-md text-white absolute top-4 right-4">
          Total Attendance {attendanceData.length}
        </h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Check-In
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Check-Out
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Location
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Camera Image
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Employee ID
                </th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.map((record, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="border border-gray-300 px-4 py-2">
                      {record?.checkin ? record.checkin.split("T")[0] : "N/A"}
                    </td>

                    {/* <td className="border border-gray-300 px-4 py-2">
                      {record?.checkin
                        ? new Date(record.checkin).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {record?.checkout
                        ? new Date(record.checkout).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </td> */}
                   <td className="border border-gray-300 px-4 py-2">
  {record?.checkin
    ? new Date(record.checkin)
        .toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit", // Include seconds
          timeZone: "Asia/Kolkata", // Explicitly set timezone to IST
        })
    : "N/A"}
</td>

<td className="border border-gray-300 px-4 py-2">
  {record?.checkout
    ? new Date(record.checkout)
        .toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit", // Include seconds
          timeZone: "Asia/Kolkata", // Explicitly set timezone to IST
        })
    : "N/A"}
</td>



                    <td className="border border-gray-300 px-4 py-2">
                      {record?.location || "N/A"}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {record?.image ? (
                        <a
                          className="text-yellow-600 text-center"
                          href={`http://192.168.1.17:5000/images/${record.image}`}
                        >
                          View Image
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {record?.userId?.employeeId || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No attendance data available.
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

export default ParticularAttendance;
