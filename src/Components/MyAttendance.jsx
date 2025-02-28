
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
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { //check of thoken 
      navigate("/"); 
    } else {
      fetchProfile(token);
    }
  }, [navigate]);


  //const fetchData = async ()=>{
    // const response = await axios.get("").then((response)=>response.data).catch((err)=>console.log(err))
    //  }
  const fetchProfile = async (token) => {
    try {
      const response = await axios.get(
        "https://tryhr-be.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data?.user;  
      console.log(userData,"userdata");
      if (userData?._id) {
        setUserData(userData); 
        fetchAttendanceData(userData._id, token); 
      } else {
        console.error("User ID not found in response.");
        alert("User ID not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      alert("Error fetching user profile")
    }
  };

  const fetchAttendanceData = async (id, token) => {
    try {
      const response = await axios.get(
        `https://tryhr-be.onrender.com/api/attendance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const data = response.data?.userAttendance || [];
      // console.log(data,"data"); 
      // setAttendanceData(data); 
      const data = response.data?.userAttendance || [];
console.log(data, "data");


const reversedData = [...data].reverse();

setAttendanceData(reversedData);

    } catch (error) {
      console.error("Error fetching attendance data:", error.message);
      alert("Failed to fetch attendance data. Please try again.");
    }
  };

  // const handleDownload = () => {
  //   if (attendanceData.length === 0) {
  //     alert("No attendance records to download.");
  //     return;
  //   }

  //   const csvHeader = "Date,Check-In,Check-Out,Location,Employee ID\n";
  //   const csvRows = attendanceData
  //     .map((record) => {
  //       const date = record?.checkin ? new Date(record.checkin).toLocaleDateString() : "N/A";
  //       const checkInTime = record?.checkin
  //         ? new Date(record.checkin).toLocaleTimeString("en-IN", {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           })
  //         : "N/A";
  //       const checkOutTime = record?.checkout
  //         ? new Date(record.checkout).toLocaleTimeString("en-IN", {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           })
  //         : "N/A";
  //       const location = record.location || "N/A";
  //       const employeeId = record.userId || "N/A";

  //       return `${date},${checkInTime},${checkOutTime},${location},${employeeId}`;
  //     })
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
  // const handleDownload = () => {
  //   if (attendanceData.length === 0) {
  //     alert("No attendance records to download.");
  //     return;
  //   }
  
   
  //   const csvHeader = "Date,Check-In,Check-Out,Location,Camera Image,Employee ID,Status\n";
  
    
  //   const csvRows = attendanceData
  //     .map((record) => {
        
  //       const date = record.checkin
  //         ? new Date(record.checkin).toLocaleDateString()
  //         : "N/A";
  
       
  //       const checkInTime = record.checkin
  //         ? new Date(record.checkin).toLocaleTimeString("en-IN", {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           })
  //         : "N/A";
  

  //       const checkOutTime = record.checkout
  //         ? new Date(record.checkout).toLocaleTimeString("en-IN", {
  //             hour: "2-digit",
  //             minute: "2-digit",
  //           })
  //         : "N/A";
  
       
  //       const location = typeof record.location === "string" ? record.location : "N/A";
  
        
  //       const cameraImage = record.image ? `View Image` : "N/A";
  
        
  //       const employeeId = userData?.employeeId || "N/A";
  
       
  //       const status = record.attendanceStatus || "N/A";
  
  //       return `${date},${checkInTime},${checkOutTime},${location},${cameraImage},${employeeId},${status}`;
  //     })
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
    if (attendanceData.length === 0) {
      alert("No attendance records to download.");
      return;
    }
  
    // Define the CSV header
    const csvHeader = "Date,Check-In,Check-Out,Latitude,Longitude,Camera Image,Employee ID,Working Hrs.,Status\n";
  
    // Map attendance data to CSV rows
    const csvRows = attendanceData
      .map((record) => {
        // Format date
        const date = record.checkin
          ? new Date(record.checkin).toLocaleDateString()
          : "N/A";
  
        // Format check-in time
        const checkInTime = record.checkin
          ? new Date(record.checkin).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";
  
        // Format check-out time
        const checkOutTime = record.checkout
          ? new Date(record.checkout).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";
  
        // Format location
        const location = typeof record.location === "string" ? record.location : "N/A";
  
        // Format camera image link
        const cameraImage = record.image ? `View Image` : "N/A";
  
        // Format employee ID
        const employeeId = userData?.employeeId || "N/A";
  
        // Format total working hours
        const totalWorkHours = record.totalWorkHours || "N/A";
  
        // Format status
        const status = record.attendanceStatus || "N/A";
  
        // Return the CSV row
        return `${date},${checkInTime},${checkOutTime},${location},${cameraImage},${employeeId},${totalWorkHours},${status}`;
      })
      .join("\n");
  
    // Combine header and rows
    const csvData = csvHeader + csvRows;
  
    // Create and download the CSV file
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
    setIsSidebarOpen(false); 
    navigate(path);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen poppins bg-zinc-200">
     
      {!isSidebarOpen && (
        <button
          className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <TiThMenu />
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
          <button  onClick={() => handleNavigation("/user")} className="px-1 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center">
            <FaBell className="font-bold text-xl" />
            All Notifications
          </button>
          <button
          onClick={() => handleNavigation("/userattendance")}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 tracking-tighter hover:text-black duration-300 flex justify-evenly items-center"
          >
            <IoMdCheckmarkCircleOutline className="font-bold text-xl" />
            Mark Attendance
          </button>
          <button
            onClick={() => handleNavigation("/myattendance")}
            className="px-4 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white tracking-tighter  duration-300 flex justify-evenly items-center"
          >
            <RiShieldUserLine className="text-xl" />
            My Attendances
          </button>
          <button
            onClick={() => handleNavigation("/leave")}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
          >
            <BiSolidCalendarExclamation className="font-bold text-xl" />
            Leave Status
          </button>
          <button
            onClick={handleLogOut}
             className="px-4 py-2 mt-16 bg-gradient-to-r from-red-500 to-red-700 text-white rounded hover:from-red-600 hover:to-red-800 flex justify-center items-center gap-3 transition-all duration-300"
            // className="px-4 py-2 mt-72 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
          >
            <FaPowerOff className="font-thin text-xl" />
            Logout
          </button>
        </div>
      </div>

     
      <div className="flex-1 p-5 md:ml-64">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">
       
          {userData ? `${userData.name}'s Attendance Record` : "User's Attendance Record"}
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
                <th className="border px-4 py-2">Working Hrs.</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
           
            <tbody>
  {console.log(attendanceData, "table")}
  {attendanceData.length > 0 ? (
    attendanceData.map((record, index) => {
      
      const checkinDate = record.checkin ? new Date(record.checkin) : null;
      const checkoutDate = record.checkout ? new Date(record.checkout) : null;

      return (
        <tr key={index}>
          <td className="border px-4 py-2">
            {checkinDate ? checkinDate.toLocaleDateString() : "N/A"}
          </td>
          <td className="border px-4 py-2">
            {checkinDate
              ? checkinDate.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </td>
          <td className="border px-4 py-2">
            {checkoutDate
              ? checkoutDate.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </td>
          <td className="border px-4 py-2">
            {typeof record.location === "string"
              ? record.location
              : "N/A"}
          </td>
          
          <td className="border px-4 py-2">
            
  <a href={record.image} className="text-yellow-500 hover:underline">
    View Image
  </a>
</td>



          <td className="border px-4 py-2">
          {userData.employeeId}
           
          </td>

          <td className="border px-4 py-2">
            
           <h1>{record.totalWorkHours}</h1>
          </td>
         
          <td className="border px-4 py-2">
  <h1
    className={`
      ${record.attendanceStatus.toLowerCase() === "present" ? "text-green-500" : 
        record.attendanceStatus.toLowerCase() === "absent" ? "text-red-500 " : 
        "text-yellow-500"}
    `}
  >
    {/*   */}
    {record.attendanceStatus}
  </h1>
</td>



        </tr>
      );
    })
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