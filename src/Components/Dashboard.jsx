import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";
import logo from '../assets/logo.jpg';
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://192.168.1.17:5000/api/auth/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleAttendance = () => navigate("/allattendance");

  const handleDownload = () => {
    const csvHeader = "EmployeeId,Name,Email,Position\n";
    const csvRows = users
      .map(
        (user) =>
          `${user.employeeId},${user.name},${user.email},${user.position}`
      )
      .join("\n");
    const csvData = csvHeader + csvRows;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "user_data.csv";
    link.click();

    URL.revokeObjectURL(url);swxqa
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://192.168.1.17:5000/api/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const updatedUser = { ...editingUser };
      await axios.put(
        `http://192.168.1.17:5000/api/auth/update/${editingUser._id}`,
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(
        users.map((user) => (user._id === editingUser._id ? updatedUser : user))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <>
    
    <div className="poppins flex flex-col md:flex-row min-h-screen bg-zinc-200">
      {/* Sidebar */}
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
            className="px-4 py-2 text-center  bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-start"
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
      <div className="flex-1 p-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto text-center">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th>EmployeeID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border">{user.employeeId}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.position}</td>
                    <td className="px-4 py-3 border flex justify-around">
                      <FaEye
                        onClick={() =>
                          navigate(`/main/${user._id}`, {
                            state: { name: user.name },
                          })
                        }
                        className="text-xl text-blue-500 cursor-pointer"
                      />
                      <FaEdit
                        onClick={() => handleEdit(user._id)}
                        className="text-lg text-yellow-600 cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => handleDelete(user._id)}
                        className="text-xl text-red-600 cursor-pointer"
                      />

                       
                    </td>
                  </tr>
                )) }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">EmployeeID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={editingUser.employeeId}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Position</label>
                <input
                  type="text"
                  name="position"
                  value={editingUser.position}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Dashboard;
