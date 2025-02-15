

// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import { useState, useEffect } from "react";
// // // import { RiShieldUserLine } from "react-icons/ri";
// // // import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// // // import { FaPowerOff } from "react-icons/fa";
// // // import { TiThMenu } from "react-icons/ti";
// // // import { RxCross1 } from "react-icons/rx";
// // // import logo from "../assets/logo.jpg";
// // // import { MyAlerts } from "../api/alert";
// // // import { BiSolidCalendarExclamation } from "react-icons/bi";
// // // import { FaBell } from "react-icons/fa";
// // // import { particularAttendance } from "../api/attendance";

// // // const MyAttendance = () => {
// // //   const navigate = useNavigate();
// // //   const [attendanceData, setAttendanceData] = useState([]);
// // //   const [userId, setUserId] = useState(null); // Now storing the id
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// // //   useEffect(() => {
// // //     const token = localStorage.getItem("token");
// // //     if (!token) {
// // //       navigate("/");  // If no token, navigate to login
// // //     } else {
// // //       fetchProfile(token);  // Fetch profile when token is found
// // //     }
// // //   }, [navigate]);

 
// // //   const fetchProfile = async (token) => {
// // //     try {
// // //       const response = await axios.get("http://192.168.1.17:5000/api/auth/profile", {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       });
// // //       const userData = response.data;

// // //       setUserId(userData?.user?._id); // Corrected to use _id
// // //       // console.log(userData.user._id);  // Check the full profile response
// // //       if (userData?.user?._id) {
// // //         // Check if the user ID is available, then fetch the attendance data
// // //         fetchAttendanceData(userData); // Fetch attendance data with userId
// // //         // console.log(userData)
// // //         console.log(userData)
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching user profile:", error);
// // //     }
// // //   };

// // //   const fetchAttendanceData = async (userId) => {
// // //     try {
     
// // //       const response = await axios.get(`http://192.168.1.17:5000/api/attendance/${userId}`, {
       
// // //       });
     
// // //       console.log(response)
// // //       const attendanceData = response.data?.userAttendance || []; // Correctly access the userAttendance
// // //       console.log(attendanceData);  // Check the data fetched
  
// // //       // Now, update the state with the attendance data
// // //       setAttendanceData(attendanceData); // Set the state with fetched data
// // //     } catch (error) {
// // //       console.error("Error fetching attendance data:", error);
// // //     }
// // //   };
  
 
 
 
// // //   const handleDownload = () => {
// // //     const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";
// // //     const csvRows = attendanceData
// // //       .map(
// // //         (record) =>
// // //           `${record?.checkin ? record.checkin.split("T")[0] : "N/A"},` +
// // //           `${
// // //             record?.checkin
// // //               ? new Date(record.checkin).toLocaleTimeString("en-IN", {
// // //                   hour: "2-digit",
// // //                   minute: "2-digit",
// // //                 })
// // //               : "N/A"
// // //           },` +
// // //           `${
// // //             record?.checkout
// // //               ? new Date(record.checkout).toLocaleTimeString("en-IN", {
// // //                   hour: "2-digit",
// // //                   minute: "2-digit",
// // //                 })
// // //               : "N/A"
// // //           },` +
// // //           `${record.location || "N/A"},` +
// // //           `${record.userId || "N/A"}` // userId might still exist in attendance data
// // //       )
// // //       .join("\n");

// // //     const csvData = csvHeader + csvRows;
// // //     const blob = new Blob([csvData], { type: "text/csv" });
// // //     const url = URL.createObjectURL(blob);
// // //     const link = document.createElement("a");
// // //     link.href = url;
// // //     link.download = "attendance_data.csv";
// // //     link.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   const handleLogOut = () => {
// // //     localStorage.removeItem("token");
// // //     navigate("/");  // Redirect to login after logout
// // //   };

// // //   const handleUserDashboard = () => {
// // //     navigate("/user");  // Navigate to user dashboard
// // //   };

// // //   const handleLeaveStatus = () => {
// // //     navigate("/leave");  // Navigate to leave status page
// // //   };

// // //   const handleMarkAttendance = () => {
// // //     navigate("/userattendance");  // Navigate to mark attendance page
// // //   };

// // //   const MyAttedanceClick = () => {
// // //     navigate("/myattendance");  // Navigate to this page
// // //   };

// // //   return (
// // //     <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
// // //       {/* Sidebar */}
// // //       {!isSidebarOpen && (
// // //         <button
// // //           className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
// // //           onClick={() => setIsSidebarOpen(true)} // Open the sidebar
// // //         >
// // //           <TiThMenu className="" />
// // //         </button>
// // //       )}

// // //       <div
// // //         className={`absolute md:relative z-10 w-64 bg-white text-black px-6 transition-transform ${
// // //           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
// // //         } md:translate-x-0`}
// // //       >
// // //         <button
// // //           className="lg:hidden mt-2 text-black rounded hover:bg-blue-600"
// // //           onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle the state
// // //         >
// // //           <RxCross1 className="font-thin" />
// // //         </button>
// // //         <div className="mr-4">
// // //           <img className="h-[100px] object-cover" src={logo} alt="" />
// // //         </div>
// // //         <div className="flex flex-col gap-4 mt-16">
// // //           <button
// // //             onClick={handleUserDashboard}
// // //             className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
// // //           >
// // //             <FaBell className="font-bold text-xl" />
// // //             All Notifications
// // //           </button>
// // //           <button
// // //             onClick={MyAttedanceClick}
// // //             className="px-1 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-center"
// // //           >
// // //             <RiShieldUserLine className="font-bold text-xl" />
// // //             My Attendances
// // //           </button>
// // //           <button
// // //             onClick={handleMarkAttendance}
// // //             className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 tracking-tighter hover:text-black duration-300 flex justify-evenly items-center"
// // //           >
// // //             <IoMdCheckmarkCircleOutline className="font-bold text-xl " />
// // //             Mark Attendance
// // //           </button>
// // //           <button
// // //             onClick={handleLeaveStatus}
// // //             className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
// // //           >
// // //             <BiSolidCalendarExclamation className="font-bold text-xl" />
// // //             Leave Status
// // //           </button>

// // //           <button
// // //             onClick={handleLogOut}
// // //             className="px-4 py-2 mt-96 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
// // //           >
// // //             <FaPowerOff className="font-thin text-xl " />
// // //             Logout
// // //           </button>
// // //         </div>
// // //       </div>
// // //       {/* Main Content */}
// // //       <div className="flex-1 p-5">
// // //         <h1 className="text-2xl font-bold text-blue-500 mb-4">
// // //           {userId ? `${userId}'s Attendance Record` : "User's Attendance Record"}
// // //         </h1>
// // //         <h1 className="mb-4 bg-blue-500 px-5 py-1 rounded-md text-white absolute top-4 right-4">
// // //           Total Attendance {attendanceData.length}
// // //         </h1>

// // //         <div className="overflow-x-auto bg-white shadow rounded-lg">
// // //           <table className="w-full border-collapse border border-gray-300">
// // //             <thead className="bg-blue-200">
// // //               <tr>
// // //                 <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
// // //                 <th className="border border-gray-300 px-4 py-2 text-left">Check-In</th>
// // //                 <th className="border border-gray-300 px-4 py-2 text-left">Check-Out</th>
// // //                 <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
// // //                 <th className="border border-gray-300 px-4 py-2 text-left">Camera Image</th>
// // //                 <th className="border border-gray-300 px-4 py-2 text-left">Employee ID</th>
// // //                 <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody>
// // //               {attendanceData.length > 0 ? (
// // //                 attendanceData.map((record, index) => (
// // //                   <tr key={index} className="hover:bg-blue-50 transition">
// // //                     <td className="border border-gray-300 px-4 py-2">
// // //                       {record?.checkin ? record.checkin.split("T")[0] : "N/A"}
// // //                     </td>

// // //                     <td className="border border-gray-300 px-4 py-2">
// // //                       {record?.checkin
// // //                         ? new Date(record.checkin).toLocaleTimeString("en-IN", {
// // //                             hour: "2-digit",
// // //                             minute: "2-digit",
// // //                             second: "2-digit",
// // //                             timeZone: "Asia/Kolkata",
// // //                           })
// // //                         : "N/A"}
// // //                     </td>

// // //                     <td className="border border-gray-300 px-4 py-2">
// // //                       {record?.checkout
// // //                         ? new Date(record.checkout).toLocaleTimeString("en-IN", {
// // //                             hour: "2-digit",
// // //                             minute: "2-digit",
// // //                             second: "2-digit",
// // //                             timeZone: "Asia/Kolkata",
// // //                           })
// // //                         : "N/A"}
// // //                     </td>

// // //                     <td className="border border-gray-300 px-4 py-2">
// // //                       {record.location || "N/A"}
// // //                     </td>

// // //                     <td className="border border-gray-300 px-4 py-2">
// // //                       {record.cameraImage || "N/A"}
// // //                     </td>

// // //                     <td className="border border-gray-300 px-4 py-2">
// // //                       {record.userId || "N/A"}
// // //                     </td>

// // //                     <td className="border border-gray-300 px-4 py-2">
// // //                       <span
// // //                         className={`${
// // //                           record.status === "P"
// // //                             ? "text-green-500"
// // //                             : record.status === "A"
// // //                             ? "text-red-500"
// // //                             : "text-yellow-500"
// // //                         }`}
// // //                       >
// // //                         {record.status === "P"
// // //                           ? "Present"
// // //                           : record.status === "A"
// // //                           ? "Absent"
// // //                           : "Pending"}
// // //                       </span>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr>
// // //                   <td
// // //                     className="text-center"
// // //                     colSpan={7}
// // //                     style={{ padding: "20px" }}
// // //                   >
// // //                     No records available.
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
           

// // //           </table>
// // //         </div>

// // //         <button
// // //           onClick={handleDownload}
// // //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
// // //         >
// // //           Download Attendance
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MyAttendance;

// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { useState, useEffect } from "react";
// // import { RiShieldUserLine } from "react-icons/ri";
// // import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// // import { FaPowerOff } from "react-icons/fa";
// // import { TiThMenu } from "react-icons/ti";
// // import { RxCross1 } from "react-icons/rx";
// // import logo from "../assets/logo.jpg";
// // import { BiSolidCalendarExclamation } from "react-icons/bi";
// // import { FaBell } from "react-icons/fa";

// // const MyAttendance = () => {
// //   const navigate = useNavigate();
// //   const [attendanceData, setAttendanceData] = useState([]);
// //   const [userId, setUserId] = useState(null);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       navigate("/"); // Redirect to login if no token
// //     } else {
// //       fetchProfile(token);
// //     }
// //   }, [navigate]);

// //   const fetchProfile = async (token) => {
// //     try {
// //       const response = await axios.get("http://192.168.1.17:5000/api/auth/profile", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       const userData = response.data?.user;
// //       if (userData?._id) {
// //         setUserId(userData._id); // Store userId in state
// //         fetchAttendanceData(userData._id); // Fetch attendance data
// //       } else {
// //         console.error("User ID not found in response.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user profile:", error.message);
// //     }
// //   };

// //   const fetchAttendanceData = async (id) => {
// //     try {
// //       const response = await axios.get(`http://192.168.1.17:5000/api/attendance/${id}`);
// //       const data = response.data?.userAttendance || [];
// //       setAttendanceData(data); // Set attendance data in state
// //     } catch (error) {
// //       console.error("Error fetching attendance data:", error.message);
// //     }
// //   };

// //   const handleDownload = () => {
// //     const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";
// //     const csvRows = attendanceData
// //       .map((record) => {
// //         const date = record?.checkin ? record.checkin.split("T")[0] : "N/A";
// //         const checkInTime = record?.checkin
// //           ? new Date(record.checkin).toLocaleTimeString("en-IN", {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })
// //           : "N/A";
// //         const checkOutTime = record?.checkout
// //           ? new Date(record.checkout).toLocaleTimeString("en-IN", {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })
// //           : "N/A";
// //         const location = record.location || "N/A";
// //         const employeeId = record.userId || "N/A";

// //         return `${date},${checkInTime},${checkOutTime},${location},${employeeId}`;
// //       })
// //       .join("\n");

// //     const csvData = csvHeader + csvRows;
// //     const blob = new Blob([csvData], { type: "text/csv" });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = "attendance_data.csv";
// //     link.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   const handleLogOut = () => {
// //     localStorage.removeItem("token");
// //     navigate("/");
// //   };

// //   const handleNavigation = (path) => {
// //     navigate(path);
// //   };

// //   return (
// //     <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
// //       {/* Sidebar */}
// //       {!isSidebarOpen && (
// //         <button
// //           className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
// //           onClick={() => setIsSidebarOpen(true)}
// //         >
// //           <TiThMenu />
// //         </button>
// //       )}

// //       <div
// //         className={`absolute md:relative z-10 w-64 bg-white text-black px-6 transition-transform ${
// //           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
// //         } md:translate-x-0`}
// //       >
// //         <button
// //           className="lg:hidden mt-2 text-black rounded hover:bg-blue-600"
// //           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //         >
// //           <RxCross1 />
// //         </button>
// //         <img className="h-[100px] object-cover" src={logo} alt="Logo" />
// //         <div className="flex flex-col gap-4 mt-16">
// //           <button
// //             onClick={() => handleNavigation("/user")}
// //             className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center gap-3"
// //           >
// //             <FaBell className="text-xl" />
// //             All Notifications
// //           </button>
// //           <button
// //             onClick={() => handleNavigation("/myattendance")}
// //             className="px-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
// //           >
// //             <RiShieldUserLine className="text-xl" />
// //             My Attendances
// //           </button>
// //           <button
// //             onClick={() => handleNavigation("/userattendance")}
// //             className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center"
// //           >
// //             <IoMdCheckmarkCircleOutline className="text-xl" />
// //             Mark Attendance
// //           </button>
// //           <button
// //             onClick={() => handleNavigation("/leave")}
// //             className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center"
// //           >
// //             <BiSolidCalendarExclamation className="text-xl" />
// //             Leave Status
// //           </button>
// //           <button
// //             onClick={handleLogOut}
// //             className="px-4 py-2 mt-96 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
// //           >
// //             <FaPowerOff className="text-xl" />
// //             Logout
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 p-5">
// //         <h1 className="text-2xl font-bold text-blue-500 mb-4">
// //           {userId ? `${userId}'s Attendance Record` : "User's Attendance Record"}
// //         </h1>
// //         <h1 className="mb-4 bg-blue-500 px-5 py-1 rounded-md text-white absolute top-4 right-4">
// //           Total Attendance {attendanceData.length}
// //         </h1>

// //         <div className="overflow-x-auto bg-white shadow rounded-lg">
// //           <table className="w-full border-collapse border border-gray-300">
// //             <thead className="bg-blue-200">
// //               <tr>
// //                 <th className="border px-4 py-2">Date</th>
// //                 <th className="border px-4 py-2">Check-In</th>
// //                 <th className="border px-4 py-2">Check-Out</th>
// //                 <th className="border px-4 py-2">Location</th>
// //                 <th className="border px-4 py-2">Camera Image</th>
// //                 <th className="border px-4 py-2">Employee ID</th>
// //                 <th className="border px-4 py-2">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {attendanceData.length > 0 ? (
// //                 attendanceData.map((record, index) => (
// //                   <tr key={index} className="hover:bg-blue-50 transition">
// //                     <td className="border px-4 py-2">
// //                       {record?.checkin ? record.checkin.split("T")[0] : "N/A"}
// //                     </td>
// //                     <td className="border px-4 py-2">
// //                       {record?.checkin
// //                         ? new Date(record.checkin).toLocaleTimeString("en-IN", {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                           })
// //                         : "N/A"}
// //                     </td>
// //                     <td className="border px-4 py-2">
// //                       {record?.checkout
// //                         ? new Date(record.checkout).toLocaleTimeString("en-IN", {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                           })
// //                         : "N/A"}
// //                     </td>
// //                     <td className="border px-4 py-2">{record.location || "N/A"}</td>
// //                     <td className="border px-4 py-2">{record.cameraImage || "N/A"}</td>
// //                     <td className="border px-4 py-2">{record.userId || "N/A"}</td>
// //                     <td className="border px-4 py-2">
// //                       <span
// //                         className={`${
// //                           record.status === "P"
// //                             ? "text-green-500"
// //                             : record.status === "A"
// //                             ? "text-red-500"
// //                             : "text-yellow-500"
// //                         }`}
// //                       >
// //                         {record.status === "P"
// //                           ? "Present"
// //                           : record.status === "A"
// //                           ? "Absent"
// //                           : "Pending"}
// //                       </span>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td className="text-center" colSpan={7} style={{ padding: "20px" }}>
// //                     No records available.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         <button
// //           onClick={handleDownload}
// //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
// //         >
// //           Download Attendance
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyAttendance;

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { RiShieldUserLine } from "react-icons/ri";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FaPowerOff } from "react-icons/fa";
// import { TiThMenu } from "react-icons/ti";
// import { RxCross1 } from "react-icons/rx";
// import logo from "../assets/logo.jpg";
// import { BiSolidCalendarExclamation } from "react-icons/bi";
// import { FaBell } from "react-icons/fa";

// const MyAttendance = () => {
//   const navigate = useNavigate();
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/"); // Redirect to login if no token
//     } else {
//       fetchProfile(token);
//     }
//   }, [navigate]);

//   const fetchProfile = async (token) => {
//     try {
//       const response = await axios.get("http://192.168.1.17:5000/api/auth/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const userData = response.data?.user;
//       if (userData?._id) {
//         setUserId(userData._id); // Store userId in state
//         console.log(userData._id)
//         fetchAttendanceData(userData._id, token); // Fetch attendance data
//       } else {
//         console.error("User ID not found in response.");
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error.message);
//     }
//   };

//   const fetchAttendanceData = async (id, token) => {
//     try {
//       const response = await axios.get(`http://192.168.1.17:5000/api/attendance/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = response.data?.userAttendance || [];
//       console.log(data)
//       setAttendanceData(data); // Set attendance data in state
//     } catch (error) {
//       console.error("Error fetching attendance data:", error.message);
//     }
//   };

//   const handleDownload = () => {
//     const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";
//     const csvRows = attendanceData
//       .map((record) => {
//         const date = record?.checkin ? record.checkin.split("T")[0] : "N/A";
//         const checkInTime = record?.checkin
//           ? new Date(record.checkin).toLocaleTimeString("en-IN", {
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "N/A";
//         const checkOutTime = record?.checkout
//           ? new Date(record.checkout).toLocaleTimeString("en-IN", {
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "N/A";
//         const location = record.location || "N/A";
//         const employeeId = record.userId || "N/A";

//         return `${date},${checkInTime},${checkOutTime},${location},${employeeId}`;
//       })
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

//   const handleLogOut = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
//       {/* Sidebar */}
//       {!isSidebarOpen && (
//         <button
//           className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
//           onClick={() => setIsSidebarOpen(true)}
//         >
//           <TiThMenu />
//         </button>
//       )}

//       <div
//         className={`absolute md:relative z-10 w-64 bg-white text-black px-6 transition-transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//       >
//         <button
//           className="lg:hidden mt-2 text-black rounded hover:bg-blue-600"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <RxCross1 />
//         </button>
//         <img className="h-[100px] object-cover" src={logo} alt="Logo" />
//         <div className="flex flex-col gap-4 mt-16">
//           <button
//             onClick={() => handleNavigation("/user")}
//             className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center gap-3"
//           >
//             <FaBell className="text-xl" />
//             All Notifications
//           </button>
//           <button
//             onClick={() => handleNavigation("/myattendance")}
//             className="px-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
//           >
//             <RiShieldUserLine className="text-xl" />
//             My Attendances
//           </button>
//           <button
//             onClick={() => handleNavigation("/userattendance")}
//             className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center"
//           >
//             <IoMdCheckmarkCircleOutline className="text-xl" />
//             Mark Attendance
//           </button>
//           <button
//             onClick={() => handleNavigation("/leave")}
//             className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center"
//           >
//             <BiSolidCalendarExclamation className="text-xl" />
//             Leave Status
//           </button>
//           <button
//             onClick={handleLogOut}
//             className="px-4 py-2 mt-96 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
//           >
//             <FaPowerOff className="text-xl" />
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-5">
//       <h1 className="text-2xl font-bold text-blue-500 mb-4">
//   {userId && userId.name ? `${userId.name}'s Attendance Record` : "User's Attendance Record"}
// </h1>


//         <h1 className="mb-4 bg-blue-500 px-5 py-1 rounded-md text-white absolute top-4 right-4">
//           Total Attendance {attendanceData.length}
//         </h1>

//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead className="bg-blue-200">
//               <tr>
//                 <th className="border px-4 py-2">Date</th>
//                 <th className="border px-4 py-2">Check-In</th>
//                 <th className="border px-4 py-2">Check-Out</th>
//                 <th className="border px-4 py-2">Location</th>
//                 <th className="border px-4 py-2">Camera Image</th>
//                 <th className="border px-4 py-2">Employee ID</th>
//                 <th className="border px-4 py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceData.length > 0 ? (
//                 attendanceData.map((record, index) => (
//                   <tr key={index} className="hover:bg-blue-50 transition">
//                     <td className="border px-4 py-2">
//                       {record?.checkin ? record.checkin.split("T")[0] : "N/A"}
//                     </td>
//                     <td className="border px-4 py-2">
//                       {record?.checkin
//                         ? new Date(record.checkin).toLocaleTimeString("en-IN", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                         : "N/A"}
//                     </td>
//                     <td className="border px-4 py-2">
//                       {record?.checkout
//                         ? new Date(record.checkout).toLocaleTimeString("en-IN", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                         : "N/A"}
//                     </td>
//                     <td className="border px-4 py-2">{record.location || "N/A"}</td>
//                     <td className="border px-4 py-2">{record.cameraImage || "N/A"}</td>
//                     <td className="border px-4 py-2">{record.userId || "N/A"}</td>
//                     <td className="border px-4 py-2">
//                       <span
//                         className={`${
//                           record.status === "P"
//                             ? "text-green-500"
//                             : record.status === "A"
//                             ? "text-red-500"
//                             : "text-yellow-500"
//                         }`}
//                       >
//                         {record.status === "P"
//                           ? "Present"
//                           : record.status === "A"
//                           ? "Absent"
//                           : "Pending"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="text-center" colSpan={7} style={{ padding: "20px" }}>
//                     No records available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <button
//           onClick={handleDownload}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Download Attendance
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyAttendance;



import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import logo from "../assets/logo.jpg";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { FaBell } from "react-icons/fa";

const MyAttendance = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if no token
    } else {
      fetchProfile(token);
    }
  }, [navigate]);

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get(
        "https://tryhr-be.onrender.com/api/auth/profile",
        // "http://192.168.1.17:5000/api/auth/profile", 
       
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data?.user;
      if (userData?._id) {
        setUserId(userData); // Set the entire user data
        fetchAttendanceData(userData._id, token); // Fetch attendance data
      } else {
        console.error("User ID not found in response.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const fetchAttendanceData = async (id, token) => {
    try {
      const response = await axios.get
      (`https://tryhr-be.onrender.com/api/attendance/${id}`,{
      // (`http://192.168.1.17:5000/api/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data?.userAttendance || [];
      setAttendanceData(data); // Set attendance data in state
    } catch (error) {
      console.error("Error fetching attendance data:", error.message);
    }
  };

  const handleDownload = () => {
    const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";
    const csvRows = attendanceData
      .map((record) => {
        const date = record?.checkin ? new Date(record.checkin).toLocaleDateString() : "N/A";
        const checkInTime = record?.checkin
          ? new Date(record.checkin).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A";
        const checkOutTime = record?.checkout
          ? new Date(record.checkout).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A";
        const location = record.location || "N/A";
        const employeeId = record.userId || "N/A";

        return `${date},${checkInTime},${checkOutTime},${location},${employeeId}`;
      })
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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
      {/* Sidebar */}
      {!isSidebarOpen && (
        <button
          className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <TiThMenu />
        </button>
      )}

      <div
        className={`fixed top-0 left-0  z-10 w-64 bg-white text-black px-6 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="lg:hidden mt-2 text-black rounded hover:bg-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RxCross1 />
        </button>
        <img className="h-[100px] object-cover" src={logo} alt="Logo" />
        <div className="flex flex-col gap-4 mt-16">
          <button
            onClick={() => handleNavigation("/user")}
            className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center gap-3"
          >
            <FaBell className="text-xl" />
            All Notifications
          </button>
          <button
            onClick={() => handleNavigation("/myattendance")}
            className="px-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <RiShieldUserLine className="text-xl" />
            My Attendances
          </button>
          <button
            onClick={() => handleNavigation("/userattendance")}
            className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center"
          >
            <IoMdCheckmarkCircleOutline className="text-xl" />
            Mark Attendance
          </button>
          <button
            onClick={() => handleNavigation("/leave")}
            className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 flex items-center"
          >
            <BiSolidCalendarExclamation className="text-xl" />
            Leave Status
          </button>
          <button
            onClick={handleLogOut}
            className="px-4 py-2 mt-96 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            <FaPowerOff className="text-xl" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 md:ml-64">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">
          {userId ? `${userId.name}'s Attendance Record` : "User's Attendance Record"}
        </h1>

        <h1 className="mb-4 bg-blue-500 px-5 py-1 rounded-md text-white absolute top-4 right-4">
          Total Attendance {attendanceData.length}
        </h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-200">
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Check-In</th>
                <th className="border px-4 py-2">Check-Out</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Camera Image</th>
                <th className="border px-4 py-2">Employee ID</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.map((record, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {new Date(record.checkin).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(record.checkin).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(record.checkout).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="border px-4 py-2">{record.location}</td>
                    <td className="border px-4 py-2">
                      <img className="w-16 h-16 object-cover" src={record.camera} alt="Camera" />
                    </td>
                    <td className="border px-4 py-2">{record.userId}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`${
                          record.status === "P"
                            ? "text-green-500"
                            : record.status === "A"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {record.status === "P"
                          ? "Present"
                          : record.status === "A"
                          ? "Absent"
                          : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border text-center py-4">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleDownload}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Download Attendance as CSV
        </button>
      </div>
    </div>
  );
};

export default MyAttendance;



