

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
import { RxCross1 } from "react-icons/rx";
import { AttendanceData, getAllAttendance } from "../api/attendance";
import ReactPaginate from "react-paginate";

const AllAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [filterDays, setFilterDays] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all"); 
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await getAllAttendance();
        if (response.data.status === "success") {
          const reversedRecords = [...response.data.attendanceRecords].reverse();
          console.log(response.data , 123)
          setAttendanceRecords(reversedRecords);
          setFilteredRecords(reversedRecords); 
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);
  // console.log(1234 )
 
  useEffect(() => {
    const filterRecords = () => {
      let filteredData = [...attendanceRecords];

      
      if (filterDays !== "all") {
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - parseInt(filterDays));

        filteredData = filteredData.filter((record) => {
          const recordDate = new Date(record.checkin);
          return recordDate >= pastDate && recordDate <= currentDate;
        });
      }


      if (filterMonth !== "all") {
        filteredData = filteredData.filter((record) => {
          const recordDate = new Date(record.checkin);
          return recordDate.getMonth() + 1 === parseInt(filterMonth); // Months are 0-indexed in JavaScript
        });
      }

      setFilteredRecords(filteredData);
    };

    filterRecords();
  }, [filterDays, filterMonth, attendanceRecords]);

  const handleFilterChange = (days) => {
    setFilterDays(days);
    setCurrentPage(0); 
  };

  const handleMonthFilterChange = (month) => {
    setFilterMonth(month);
    setCurrentPage(0); 
  };

  // const handleDownload = () => {
  //   const csvHeader =
  //     "EmployeeId,Date,Check-in Time,Check-out Time,Location,Image,Description,Status\n";
  //   const csvRows = filteredRecords
  //     .map(
  //       (user) =>
  //         `${user.userId?.employeeId || "Unknown"},` +
  //         `${user?.checkin ? user.checkin.split("T")[0] : "N/A"},` +
  //         `${
  //           user?.checkin ? user.checkin.split("T")[1]?.split(".")[0] : "N/A"
  //         },` +
  //         `${
  //           user?.checkout ? user.checkout.split("T")[1]?.split(".")[0] : "N/A"
  //         },` +
  //         `"${user.location || "N/A"}",` +
  //         `${user.image || "N/A"},` +
  //         `${user.description || "N/A"}`+
  //         `${user.attendanceStatus || "N/A"}` 
  //     )
  //     .join("\n");

  //   const csvData = csvHeader + csvRows;
  //   const blob = new Blob([csvData], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);

  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "attendance_records.csv";
  //   link.click();

  //   URL.revokeObjectURL(url);
  // };

  const handleDownload = () => {
    const csvHeader =
      "EmployeeId,Date,Check-in Time,Check-out Time,Location,Image,Description,Status\n";
    const csvRows = filteredRecords
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
          `"${user.location || "N/A"}",` +
          `${user.image || "N/A"},` +
          `${user.description || "N/A"},` + // Added comma here
          `${user.attendanceStatus || "N/A"}` // Status is now in the correct column
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
  

  const handleStatusChange = async (id, attendanceStatus) => {
    try {
      const response = await AttendanceData(id, attendanceStatus);
      if (response.data.status === "success") {
        const updatedRecords = attendanceRecords.map((record) =>
          record._id === id ? { ...record, attendanceStatus: attendanceStatus } : record
        );
       
        setAttendanceRecords(updatedRecords);
        setFilteredRecords(updatedRecords); 
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(filteredRecords.length / recordsPerPage);
  const offset = currentPage * recordsPerPage;
  const currentRecords = filteredRecords.slice(offset, offset + recordsPerPage);

  return (
    <div className="min-h-screen flex bg-gradient-to-r poppins from-zinc-200 to-zinc-100 poppins">
      {!isSidebarOpen && (
        <button
          className="fixed top-0 left-0 z-20 h-screen text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <TiThMenu />
        </button>
      )}

      <div
        className={`fixed z-10 w-64 h-screen bg-white text-black px-6 transition-transform ${
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
        <div className="flex flex-col gap-4 mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-start"
          >
            <MdDashboardCustomize className="font-bold text-xl" /> Dashboard
          </button>
          <button
            onClick={() => navigate("/allattendance")}
            className="px-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-start"
          >
            <FaUsersViewfinder className="font-semibold text-2xl " />
            View All
          </button>
          <button
            onClick={() => navigate("/reg")}
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
            onClick={() => navigate("/notifications")}
            className="py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-2"
          >
            <FaBell className="font-bold text-xl" />
            Alerts
          </button>
          <button
            onClick={() => navigate("/employeeleaves")}
            className="py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
          >
            <SlCalender className="font-bold text-xl" />
            Leaves
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className=" px-4 py-2 mt-56 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center gap-3"
          >
            <FaPowerOff className="font-thin text-xl " />
            Logout
          </button>
        </div>
      </div>

      <div className="ml-10 md:ml-64 w-full p-6 overflow-y-auto ">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          All Attendance Records
        </h2>
        <div className="flex gap-4 mb-4">
          {/* <select
            onChange={(e) => handleFilterChange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Records</option>
            <option value="10">Last 10 Days</option>
            <option value="15">Last 15 Days</option>
            <option value="30">Last 1 Month</option>
            <option value="90">Last 3 Months</option>
          </select> */}
          <select
            onChange={(e) => handleMonthFilterChange(e.target.value)}
            className="p-2 border rounded"
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
        {filteredRecords.length === 0 ? (
          <p className="text-center text-red-500">No data available for the selected filter.</p>
        ) : (
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
                  {/* <th className="py-3 px-4 text-center">Status</th> */}
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="text-center text-sm">
                {currentRecords.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="py-2">{record.userId?.employeeId}</td>
                    <td className="py-2">
                      {record.checkin ? record.checkin.split("T")[0] : "N/A"}
                    </td>
                    <td className="py-2">
                      {record.checkin
                        ? new Date(record.checkin).toLocaleTimeString("en-IN", {
                            hour12: false,
                            timeZone: "Asia/Kolkata",
                          })
                        : "N/A"}
                    </td>
                    <td className="py-2">
                      {record.checkout
                        ? new Date(record.checkout).toLocaleTimeString("en-IN", {
                            hour12: false,
                            timeZone: "Asia/Kolkata",
                          })
                        : "N/A"}
                    </td>
                    <td className="py-2">{record.location || "N/A"}</td>
                    <td className="py-3 px-4 text-sm flex justify-center items-center">
                      {record.image ? (
                        <a
                          className="text-yellow-600"
                          href={`https://tryhr-be.onrender.com/images/${record.image}`}
                        >
                          View Image
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-left">
                      {record.description || "N/A"}
                    </td>
                    {/* <td className="py-2">{record.attendanceStatus || null}</td> */}
                    {/* <td
  className={`py-2 ${
    record.attendanceStatus === "Absent"
      ? " text-red-500"
      : record.attendanceStatus === "Present"
      ? " text-green-500"
      : " text-yellow-500"
  }`}
>
  {record.attendanceStatus || "Unknown"}
</td> */}

                    <td className="py-2">
                      <select
                        onChange={(e) =>
                          handleStatusChange(record._id, e.target.value)
                        }
                        defaultValue={record.attendanceStatus || null}
                      >
                        <option value="Absent">Absent</option>
                        <option value="Present">Present</option>
                        <option value="Halfday">Halfday</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex gap-2"}
            previousClassName={"px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"}
            nextClassName={"px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"}
            activeClassName={"bg-blue-700 text-blue-500 px-4 py-2 rounded"}
            pageClassName={"px-3 py-2 bg-gray-200 rounded cursor-pointer"}
          />
        </div>
      </div>
    </div>
  );
};

export default AllAttendance;