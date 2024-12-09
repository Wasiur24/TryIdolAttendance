import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { FaPowerOff } from "react-icons/fa6";
// import logo from '../assets/loga.png';
import logo from '../assets/logo.jpg';
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";

import { FaBell } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidCalendarExclamation } from "react-icons/bi";


function MarkAttendance() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  // const [location, setLocation] = useState(null);
  const [camera, setCamera] = useState(true);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  
  
  const [productivity, setProductivity] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
 
  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      
      navigate("/");
    }
  }, [navigate]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    let watchId;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log(coords);
          setLocation(coords);

        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Failed to retrieve location.");
        },
        {
          enableHighAccuracy: true, // Use GPS for high accuracy
          maximumAge: 0, // Prevent caching old location data
          timeout: 8000, // Maximum time to wait for location
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    // Cleanup function to stop watching the location
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const coords = {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         };
  //         console.log(coords);
  //         setLocation(coords);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error.message);
  //         alert("Failed to retrieve location. Please check device settings.");
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         maximumAge: 0,
  //         timeout: 10000, // Increase timeout to 10 seconds
  //       }
  //     );
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }, []);
  


  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
        // alert("Could not access the camera.");
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    
    const storedData = JSON.parse(localStorage.getItem("attendanceData"));
    if (storedData) {
      setCheckInTime(storedData.checkin);
      setCheckOutTime(storedData.checkout); 
      setCapturedImage(storedData.image);
      setLocation(storedData.location);
      setProductivity(storedData.productivity || ""); 
    }
  }, []);

  // Handle Check-in time
  const handleCheckIn = () => {
    const currentTime = new Date().toLocaleString(); 
    setCheckInTime(currentTime);
    localStorage.setItem(
      "attendanceData",
      JSON.stringify({
        checkin: currentTime,
        image: capturedImage,
        location: location,
        productivity: productivity, 
      })
    );
    console.log(`Check-in Time : ${currentTime}`);
  };

 
  const handleCheckOut = () => {
    const currentTime = new Date().toLocaleString(); 
    setCheckOutTime(currentTime);
    localStorage.setItem(
      "attendanceData",
      JSON.stringify({
        checkin: checkInTime,
        checkout: currentTime,
        image: capturedImage,
        location: location,
        productivity: productivity, // **Include productivity in localStorage**
      })
    );
    console.log(`Check-out Time : ${currentTime}`);
  };

  // Handle Capture Image
  const handleCaptureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);

      // Save image data to localStorage on capture
      const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
      localStorage.setItem(
        "attendanceData",
        JSON.stringify({ ...storedData, image: imageData })
      );
    }
  };

  // **New Handler for Productivity Input**
  const handleProductivityChange =async (e) => {
    setProductivity(e.target.value);
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
    localStorage.setItem(
      "attendanceData",
      JSON.stringify({ ...storedData, productivity: e.target.value })
    );
  };


  const handleSubmit = async () => {
    if (!checkInTime && !checkOutTime) {
      alert("Please record at least one of the times: Check-in or Check-out.");
      return;
    }
  
    if (!location) {
      alert("Location is required. Please record your location.");
      return;
    }

    // if (!productivity) {
    //   alert("Mention your todays Productivity ");
    //   return;
    // }
  
    const locationString = `${location.latitude}, ${location.longitude}`;
  
    const attendanceData = {
      location: locationString,
      image: capturedImage,
      checkin: checkInTime ? new Date(checkInTime).toISOString() : "",
      checkout: checkOutTime ? new Date(checkOutTime).toISOString() : "",
      description: productivity, // Include productivity as description
    };
  
    console.log("Attendance Data Submitted:", attendanceData);
  
    try {
      const token = localStorage.getItem("token"); // Token assumed to be stored in localStorage
      if (!token) {
        alert("Authorization token is missing. Please log in again.");
        return;
      }
  
      const response = await axios.post(
        "http://192.168.1.17:5000/api/attendance/mark",
        attendanceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Submission Success:", response.data);
  
      // Clear localStorage after submission
      localStorage.removeItem("attendanceData");
  
      navigate("/success"); // Redirect to success page
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Failed to submit attendance. Please try again.");
    }
  };
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleLeaveStatus=()=>{
    navigate("/leave");
  }

  const handleUserDashboard=()=>{
    navigate("/user");
  }

  const handleMarkAttendance=()=>{
    navigate('/userattendance');
  }

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
        <div className="flex flex-col gap-4 mt-16">
         
          <button
            onClick={handleUserDashboard}
            className="px-2 py-2 text-center  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center "
          >
            <FaBell className="font-bold text-xl" />All Notifications
          </button>
          <button
            onClick={handleMarkAttendance}
            className="px-4 py-2 text-center  bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white tracking-tighter  duration-300 flex justify-evenly items-center"
          >
            <IoMdCheckmarkCircleOutline className="font-bold text-xl" />Mark Attendance
          </button>
          <button
            onClick={handleLeaveStatus}
            className="px-4 py-2 text-center  bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
          >
            <BiSolidCalendarExclamation className="font-bold text-xl" />Leave Status
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
      <div className="min-h-screen mx-auto flex items-center justify-center ">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-xl w-[6000px] max-w-lg transform transition duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6">
          Attendance Page
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 mb-4">
            {camera && (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover rounded-full"
              ></video>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4 mb-6">
          {location && (
            <input
              type="text"
              value={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
              readOnly
              className="w-full px-4 py-2 bg-gray-100 text-gray-600 border rounded-lg focus:outline-none"
            />
          )}
        </div>

        {/* **Conditional Rendering: Show Buttons or Text Editor** */}
        {!(checkInTime && checkOutTime) ? (
          <div className="flex justify-between mb-6 space-x-2">
            {!checkInTime && (
              <button
                onClick={handleCheckIn}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition duration-300"
              >
                Check-in
              </button>
            )}
            {!checkOutTime && (
              <button
                onClick={handleCheckOut}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none transition duration-300"
              >
                Check-out
              </button>
            )}
          </div>
        ) : (
          // **Productivity Text Editor**
          <div className="mb-6">
            <label
              htmlFor="productivity"
              className="block text-gray-700 font-semibold mb-2"
            >
              Daily Productivity:
            </label>
            <textarea
              id="productivity"
              value={productivity}
              onChange={handleProductivityChange}
              placeholder="Describe your productivity for today..."
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 border rounded-lg focus:outline-none resize-none h-32"
            ></textarea>
          </div>
         
        )}

        <div className="flex justify-center mb-6">
          <button
            onClick={handleCaptureImage}
            className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none transition duration-300"
          >
            Capture Image
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none transition duration-300"
          >
            Submit
          </button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
      
</div>
    </div>
  );
}

export default MarkAttendance;
