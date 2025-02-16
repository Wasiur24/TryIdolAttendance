
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import { HiOutlineDownload } from "react-icons/hi";
// import { MdDashboardCustomize } from "react-icons/md";
// import { AiOutlineUserAdd } from "react-icons/ai";
// import { FaPowerOff } from "react-icons/fa6";
// import { FaUsersViewfinder } from "react-icons/fa6";
// import { MdMessage } from "react-icons/md";
// import logo from '../assets/logo.jpg';
// import { FaBell } from "react-icons/fa";
// import { SlCalender } from "react-icons/sl";
// import { TiThMenu } from "react-icons/ti";
// import { RxCross1 } from "react-icons/rx";
// import { particularAttendance } from "../api/attendance";

// const ParticularAttendance = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation(); 
//   const { id } = useParams(); 
//   const userName = state?.name || "Unknown User";
//   const employeeId = state?.employeeId || "Unknown ID";
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filter, setFilter] = useState("all"); // State for the selected filter

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/");
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchAttendance = async () => {
//       try {
//         const response = await particularAttendance(id);
//         const fetchedData = Array.isArray(response.data.userAttendance)
//           ? response.data.userAttendance
//           : [];
//         setAttendanceData(fetchedData.reverse());
//         setFilteredData(fetchedData); // Initialize filteredData with all data
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//         setAttendanceData([]);
//         setFilteredData([]);
//       }
//     };

//     fetchAttendance();
//   }, [id]);

//   // Function to filter data based on the selected option
//   const filterData = (filter) => {
//     const now = new Date();
//     let filtered = [];

//     switch (filter) {
//       case "10days":
//         filtered = attendanceData.filter(record => {
//           const recordDate = new Date(record.checkin);
//           return (now - recordDate) <= 10 * 24 * 60 * 60 * 1000;
//         });
//         break;
//       case "15days":
//         filtered = attendanceData.filter(record => {
//           const recordDate = new Date(record.checkin);
//           return (now - recordDate) <= 15 * 24 * 60 * 60 * 1000;
//         });
//         break;
//       case "1month":
//         filtered = attendanceData.filter(record => {
//           const recordDate = new Date(record.checkin);
//           return (now - recordDate) <= 30 * 24 * 60 * 60 * 1000;
//         });
//         break;
//       case "3months":
//         filtered = attendanceData.filter(record => {
//           const recordDate = new Date(record.checkin);
//           return (now - recordDate) <= 90 * 24 * 60 * 60 * 1000;
//         });
//         break;
//       default:
//         filtered = attendanceData;
//         break;
//     }

//     setFilteredData(filtered);
//   };

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const selectedFilter = e.target.value;
//     setFilter(selectedFilter);
//     filterData(selectedFilter);
//   };

//   const handleDownload = () => {
//     const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";
//     const csvRows = filteredData
//       .map(
//         (record) =>
//           `${record?.checkin ? record.checkin.split("T")[0] : "N/A"},` +
//           `${
//             record?.checkin
//               ? new Date(record.checkin).toLocaleTimeString("en-IN", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "N/A"
//           },` +
//           `${
//             record?.checkout
//               ? new Date(record.checkout).toLocaleTimeString("en-IN", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "N/A"
//           },` +
//           `${record.location || "N/A"},` +
//           `${record.userId || "N/A"}`
//       )
//       .join("\n");

//     const csvData = csvHeader + csvRows;
//     const blob = new Blob([csvData], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "attendance_data.csv";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleUserDetails = () => navigate("/reg");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const handleLogOut = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };
//   const handleNotification = () => navigate('/notifications');
//   const handleDashboard = () => navigate("/dashboard");
//   const handleLeave = () => navigate('/employeeleaves');
//   const handleAttendance = () => navigate("/allattendance");

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 z-10 w-64 bg-white text-white  px-6 transition-transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//       >
//         <button
//           className="lg:hidden mb-4 text-white bg-blue-500 px-3 py-2 rounded hover:bg-blue-600"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           Toggle Menu
//         </button >
//         <div className="mr-4">
//           <img className="h-[100px] object-cover" src={logo} alt="" />
//         </div>
//         <div className="flex flex-col gap-4 mt-12">
//           <button
//             onClick={handleDashboard}
//             className="px-4 py-2 text-center  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-start"
//           >
//             <MdDashboardCustomize className="font-bold text-xl" /> Dashboard
//           </button>
//           <button
//             onClick={handleAttendance}
//             className="px-1 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300  flex justify-evenly items-start"
//           >
//             <FaUsersViewfinder className="font-semibold text-2xl " />
//             View All
//           </button>
//           <button
//             onClick={handleUserDetails}
//             className="px-4 py-2  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-start"
//           >
//             <AiOutlineUserAdd className="font-bold text-xl" /> Add User
//           </button>
//           <button
//             onClick={handleDownload}
//             className="px-4 py-2  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center"
//           >
//             <HiOutlineDownload className="font-bold text-xl" />
//             Download
//           </button>

//           <button
//             onClick={handleNotification}
//             className="py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-2"
//           >
//             <FaBell className="font-bold text-xl" />
//              Alerts
//           </button>

//           <button
//             onClick={handleLeave}
//             className="py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
//           >
//             <SlCalender className="font-bold text-xl" />
//             Leaves
//           </button>

//           <button
//             onClick={handleLogOut}
//             className=" px-4 py-2 mt-56 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
//           >
//             <FaPowerOff className="font-thin text-xl " />
//             Logout
//           </button>
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex-1 p-5 md:ml-64">
//         <h1 className="text-2xl font-bold text-blue-500 mb-4">
//           {userName}'s Attendance Record
//         </h1>
       
//         <h1 className="mb-4 bg-blue-500 px-5 py-1 rounded-md text-white absolute top-4 right-4">
//           Total Attendance {filteredData.length}
//         </h1>

//         {/* Filter Dropdown */}
//         <div className="mb-4">
//           <label htmlFor="filter" className="mr-2">Filter by:</label>
//           <select
//             id="filter"
//             value={filter}
//             onChange={handleFilterChange}
//             className="px-4 py-2 border rounded"
//           >
//             <option value="all">All</option>
//             <option value="10days">Last 10 Days</option>
//             <option value="15days">Last 15 Days</option>
//             <option value="1month">Last 1 Month</option>
//             <option value="3months">Last 3 Months</option>
//           </select>
//         </div>

//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead className="bg-blue-200">
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">Check-In</th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">Check-Out</th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">Camera Image</th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">Employee ID</th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((record, index) => (
//                   <tr key={index} className="hover:bg-blue-50 transition">
//                     <td className="border border-gray-300 px-4 py-2">
//                       {record?.checkin ? record.checkin.split("T")[0] : "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {record?.checkin
//                         ? new Date(record.checkin)
//                             .toLocaleTimeString("en-IN", {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               second: "2-digit",
//                               timeZone: "Asia/Kolkata",
//                             })
//                         : "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {record?.checkout
//                         ? new Date(record.checkout)
//                             .toLocaleTimeString("en-IN", {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               second: "2-digit",
//                               timeZone: "Asia/Kolkata",
//                             })
//                         : "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {record?.location || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {record?.image ? (
//                         <a
//                           className="text-yellow-600 text-center"
//                           href={`https://tryhr-be.onrender.com/images/${record.image}`}
//                         >
//                           View Image
//                         </a>
//                       ) : (
//                         "No Image"
//                       )}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {record?.userId?.employeeId || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {record?.attendanceStatus || "N/A"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="border border-gray-300 px-4 py-2 text-center text-gray-500"
//                   >
//                     No attendance data available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParticularAttendance;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
import { RxCross1 } from "react-icons/rx";
import { particularAttendance } from "../api/attendance";

const ParticularAttendance = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { id } = useParams(); 
  const userName = state?.name || "Unknown User";
  const employeeId = state?.employeeId || "Unknown ID";
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all"); // State for the selected filter
  const [monthFilter, setMonthFilter] = useState("all"); // State for the month filter

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAttendance = async () => {
      try {
        const response = await particularAttendance(id);
        const fetchedData = Array.isArray(response.data.userAttendance)
          ? response.data.userAttendance
          : [];
          console.log(fetchedData)
        setAttendanceData(fetchedData.reverse());
        setFilteredData(fetchedData); 
        
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setAttendanceData([]);
        setFilteredData([]);
      }
    };

    fetchAttendance();
  }, [id]);

  // Function to filter data based on the selected option
  const filterData = (filter, monthFilter) => {
    const now = new Date();
    let filtered = [...attendanceData];

    // Filter by days
    switch (filter) {
      case "10days":
        filtered = filtered.filter(record => {
          const recordDate = new Date(record.checkin);
          return (now - recordDate) <= 10 * 24 * 60 * 60 * 1000;
        });
        break;
      case "15days":
        filtered = filtered.filter(record => {
          const recordDate = new Date(record.checkin);
          return (now - recordDate) <= 15 * 24 * 60 * 60 * 1000;
        });
        break;
      case "1month":
        filtered = filtered.filter(record => {
          const recordDate = new Date(record.checkin);
          return (now - recordDate) <= 30 * 24 * 60 * 60 * 1000;
        });
        break;
      case "3months":
        filtered = filtered.filter(record => {
          const recordDate = new Date(record.checkin);
          return (now - recordDate) <= 90 * 24 * 60 * 60 * 1000;
        });
        break;
      default:
        break;
    }

    // Filter by month
    if (monthFilter !== "all") {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.checkin);
        return recordDate.getMonth() + 1 === parseInt(monthFilter); // Months are 0-indexed in JavaScript
      });
    }

    setFilteredData(filtered);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    filterData(selectedFilter, monthFilter);
  };

  // Handle month filter change
  const handleMonthFilterChange = (e) => {
    const selectedMonth = e.target.value;
    setMonthFilter(selectedMonth);
    filterData(filter, selectedMonth);
  };

  // const handleDownload = () => {
  //   const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";
  //   const csvRows = filteredData
  //     .map(
  //       (record) =>
  //         `${record?.checkin ? record.checkin.split("T")[0] : "N/A"},` +
  //         `${
  //           record?.checkin
  //             ? new Date(record.checkin).toLocaleTimeString("en-IN", {
  //                 hour: "2-digit",
  //                 minute: "2-digit",
  //               })
  //             : "N/A"
  //         },` +
  //         `${
  //           record?.checkout
  //             ? new Date(record.checkout).toLocaleTimeString("en-IN", {
  //                 hour: "2-digit",
  //                 minute: "2-digit",
  //               })
  //             : "N/A"
  //         },` +
  //         `${record.location || "N/A"},` +
  //         `${record.userId || "N/A"}`
  //     )
  //     .join("\n");

  //   const csvData = csvHeader + csvRows;
  //   const blob = new Blob([csvData], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "attendance_data.csv";
  //   link.click();
  //   URL.revokeObjectURL(url);
  // };
  const handleDownload = () => {
    const csvHeader =
      "Date,Check-In,Check-Out,Latitude,Longitude,Camera Image,Employee ID,Status\n";
    const csvRows = filteredData
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
          `${record.image || "N/A"},` + // Added Camera Image column
          `${record.userId.employeeId || "N/A"},` + // Employee ID
          `${record.attendanceStatus || "N/A"}` // Status column added
      )
      .join("\n");
  
    const csvData = csvHeader + csvRows;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  
  const handleUserDetails = () => navigate("/reg");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleNotification = () => navigate('/notifications');
  const handleDashboard = () => navigate("/dashboard");
  const handleLeave = () => navigate('/employeeleaves');
  const handleAttendance = () => navigate("/allattendance");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-10 w-64 bg-white text-white  px-6 transition-transform ${
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
      <div className="flex-1 p-5 md:ml-64">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">
          {userName}'s Attendance Record
        </h1>
       
        <h1 className="mb-4 bg-blue-500 px-5 py-1 rounded-md text-white absolute top-4 right-4">
          Total Attendance : {filteredData.length}
        </h1>
      

        {/* Filter Dropdowns */}
        <div className="flex gap-4 mb-4">
          {/* <div> */}
            {/* <label htmlFor="filter" className="mr-2">Filter by:</label> */}
            {/* <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded"
            >
              <option value="all">All</option>
              <option value="10days">Last 10 Days</option>
              <option value="15days">Last 15 Days</option>
              <option value="1month">Last 1 Month</option>
              <option value="3months">Last 3 Months</option>
            </select> */}
          {/* </div> */}
          <div>
            <label htmlFor="monthFilter" className="mr-2">Filter by Month:</label>
            <select
              id="monthFilter"
              value={monthFilter}
              onChange={handleMonthFilterChange}
              className="px-4 py-2 border rounded"
            >
              <option value="all">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>

        <h1 className="mb-4 bg-yellow-500 px-5 py-1 rounded-md text-white absolute top-4 right-64">
  Total LateCount : {filteredData.length > 0 ? filteredData[0].lateCount : 0}
</h1>


       

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Check-In</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Check-Out</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Camera Image</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Employee ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="border border-gray-300 px-4 py-2">
                      {record?.checkin ? record.checkin.split("T")[0] : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record?.checkin
                        ? new Date(record.checkin)
                            .toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              timeZone: "Asia/Kolkata",
                            })
                        : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {record?.checkout
                        ? new Date(record.checkout)
                            .toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              timeZone: "Asia/Kolkata",
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
                          href={`https://tryhr-be.onrender.com/images/${record.image}`}
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
                    {/* <td className="border border-gray-300 px-4 py-2">
                      {record?.attendanceStatus || "N/A"}
                    </td> */}
                         <td
  className={`py-2 border border-gray-300 px-4 ${
    record.attendanceStatus === "Absent"
      ? " text-red-500"
      : record.attendanceStatus === "Present"
      ? " text-green-500"
      : " text-yellow-500"
  }`}
>
  {record.attendanceStatus || "Unknown"}
</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
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