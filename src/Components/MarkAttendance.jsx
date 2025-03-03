


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { FaPowerOff } from "react-icons/fa6";
import logo from '../assets/logo.jpg';
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { RiShieldUserLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidCalendarExclamation } from "react-icons/bi";

function MarkAttendance() {
  const navigate = useNavigate();
  const [camera, setCamera] = useState(true);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [productivity, setProductivity] = useState("");
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(
    localStorage.getItem("isCheckedIn") === "true" // Initialize from localStorage
  );

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    let watchId;

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(coords);
          },
          (error) => {
            console.error("Error getting location:", error.message);
            alert("Failed to retrieve location.");
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Failed to retrieve location.");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

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

  const handleCheckIn = async () => {
    const currentTime = new Date().toLocaleString();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    if (!location || !location.latitude || !location.longitude) {
      alert("Location data is missing.");
      return;
    }

    const locationString = `${location.latitude}, ${location.longitude}`;

    const checkInData = {
      checkin: currentTime,
      location: locationString,
    };

    try {
      const response = await axios.post(
        "https://tryhr-be.onrender.com/api/attendance/checkin",
        checkInData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Check-in Success:", response.data);
      alert("Check-in successful. Please do not log out; simply close the tab when you're done");
      setCheckInTime(currentTime);
      setIsCheckedIn(true); // Update check-in state
      localStorage.setItem("isCheckedIn", "true"); // Store in localStorage
    } catch (error) {
      console.error("Error during check-in:", error);
      alert(`Failed to check-in: ${error.response?.data?.message || error.message}`);
    }
  };

  // const handleCheckOut = async () => {
  //   const currentTime = new Date().toISOString();
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     alert("Authorization token is missing. Please log in again.");
  //     return;
  //   }

  //   if (!capturedImage) {
  //     alert("Captured image is missing.");
  //     return;
  //   }

  //   if (!productivity) {
  //     alert("Productivity description is missing.");
  //     return;
  //   }

  //   const checkOutData = {
  //     checkout: currentTime,
  //     image: capturedImage,
  //     description: productivity,
  //   };

  //   console.log("Check-out data:", checkOutData);

  //   try {
  //     const response = await axios.post(
  //       "http://192.168.1.16:5000/api/attendance/checkout",
  //       checkOutData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Check-out Success:", response.data);
  //     setCheckOutTime(currentTime);
  //     setIsCheckedIn(false); // Update check-in state
  //     localStorage.setItem("isCheckedIn", "false"); // Store in localStorage
  //     navigate("/success"); // Navigate to success page after check-out
  //   } catch (error) {
  //     console.error("Error during check-out:", error);
  //     alert(`Failed to check-out: ${error.response?.data?.message || error.message}`);
  //   }
  // };
  const handleCheckOut = async () => {
    const currentTime = new Date().toISOString();
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }
  
    if (!capturedImage) {
      alert("Captured image is missing.");
      return;
    }
  
    if (!productivity) {
      alert("Productivity description is missing.");
      return;
    }
  
    const checkOutData = {
      checkout: currentTime,
      image: capturedImage,
      description: productivity,
    };
  
    console.log("Check-out data:", checkOutData);
  
    try {
      const response = await axios.post(
        "https://tryhr-be.onrender.com/api/attendance/checkout",
        checkOutData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Check-out Success:", response.data);
      setCheckOutTime(currentTime);
      setIsCheckedIn(false); // Update check-in state
      localStorage.setItem("isCheckedIn", "false"); // Store in localStorage
      setProductivity(""); // Clear productivity state
      navigate("/success"); // Navigate to success page after check-out
    } catch (error) {
      console.error("Error during check-out:", error);
      alert(`Failed to check-out: ${error.response?.data?.message || error.message}`);
    }
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
  
    if (!productivity) {
      alert("Mention your today's Productivity.");
      return;
    }
  
    setIsSubmitting(true);
  
    const locationString = `${location.latitude}, ${location.longitude}`;
  
    const attendanceData = {
      location: locationString,
      image: capturedImage,
      checkin: checkInTime ? new Date(checkInTime).toISOString() : "",
      checkout: checkOutTime ? new Date(checkOutTime).toISOString() : "",
      description: productivity,
    };
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authorization token is missing. Please log in again.");
        setIsSubmitting(false);
        return;
      }
  
      // Remove productivity from localStorage
      localStorage.removeItem("attendanceData");
  
      // Clear productivity state
      setProductivity("");
  
      setTimeout(() => {
        navigate("/success");
      }, 1000);
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Failed to submit attendance. Please try again.");
      setIsSubmitting(false);
    }
  };
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
      setIsImageClicked(true);

      const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
      localStorage.setItem(
        "attendanceData",
        JSON.stringify({ ...storedData, image: imageData })
      );
    }
  };

  // const handleProductivityChange = async (e) => {
  //   setProductivity(e.target.value);
  //   const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
  //   localStorage.setItem(
  //     "attendanceData",
  //     JSON.stringify({ ...storedData, productivity: e.target.value })
  //   );
  // };

  const handleProductivityChange = async (e) => {
    setProductivity(e.target.value);
    // Do not save productivity in localStorage
  };

  // const handleSubmit = async () => {
  //   if (!checkInTime && !checkOutTime) {
  //     alert("Please record at least one of the times: Check-in or Check-out.");
  //     return;
  //   }

  //   if (!location) {
  //     alert("Location is required. Please record your location.");
  //     return;
  //   }

  //   if (!productivity) {
  //     alert("Mention your today's Productivity.");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   const locationString = `${location.latitude}, ${location.longitude}`;

  //   const attendanceData = {
  //     location: locationString,
  //     image: capturedImage,
  //     checkin: checkInTime ? new Date(checkInTime).toISOString() : "",
  //     checkout: checkOutTime ? new Date(checkOutTime).toISOString() : "",
  //     description: productivity,
  //   };

  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("Authorization token is missing. Please log in again.");
  //       setIsSubmitting(false);
  //       return;
  //     }

  //     localStorage.removeItem("attendanceData");

  //     setTimeout(() => {
  //       navigate("/success");
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error during submission:", error);
  //     alert("Failed to submit attendance. Please try again.");
  //     setIsSubmitting(false);
  //   }
  // };
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isCheckedIn"); // Clear check-in state on logout
    navigate("/");
  };

  const handleLeaveStatus = () => {
    navigate("/leave");
  };

  const handleUserDashboard = () => {
    navigate("/user");
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
      {!isSidebarOpen && (
        <button
          className="fixed top-0 left-0 z-20 text-black px-3 py-2 rounded-full hover:bg-blue-600 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <TiThMenu className="" />
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
          <button
            onClick={handleUserDashboard}
            className="px-2 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center"
          >
            <FaBell className="font-bold text-xl" />
            All Notifications
          </button>
          <button
            onClick={handleMarkAttendance}
            className="px-4 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white tracking-tighter duration-300 flex justify-evenly items-center"
          >
            <IoMdCheckmarkCircleOutline className="font-bold text-xl" />
            Mark Attendance
          </button>
          <button
            onClick={Myattendance}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black tracking-tighter  duration-300 flex justify-evenly items-center"
          >
            <RiShieldUserLine className="text-xl" />
            My Attendances
          </button>
          <button
            onClick={handleLeaveStatus}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
          >
            <BiSolidCalendarExclamation className="font-bold text-xl" />
            Leave Status 
          </button>
          <button
            onClick={handleLogOut}
            className="px-4 py-2 mt-16 bg-gradient-to-r from-red-500 to-red-700 text-white rounded hover:from-red-600 hover:to-red-800 flex justify-center items-center gap-3 transition-all duration-300"
          >
            <FaPowerOff className="font-thin text-xl" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="sm:h-[100vh] sm:w-[100vw] min-h-screen mx-auto flex items-center justify-center md:ml-64">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-xl w-[6000px] max-w-lg transform transition duration-500 ease-in-out border-2 border-zinc-300">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6">
            Attendance Page
          </h2>

          <div className="flex justify-center mb-2">
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

          {isImageClicked && (
            <p className="text-center text-yellow-500 font-medium mb-4">
              Image Clicked!
            </p>
          )}
 
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

          {!isCheckedIn && !checkInTime && (
            <div className="flex justify-between mb-6 space-x-2">
              <button
                onClick={handleCheckIn}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 
  hover:from-blue-500 hover:to-blue-700 text-white rounded-lg shadow-md focus:outline-none transition duration-300"
              >
                Check-in
              </button>
            </div>
          )}

          {isCheckedIn && !checkOutTime && (
            <div className="flex justify-between mb-6 space-x-2">
              <button
                onClick={handleCheckOut}
                className="w-full px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 
  hover:from-zinc-700 hover:to-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none transition duration-300"
              >
                Check-out
              </button>
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="productivity"
              className="block text-gray-700 font-semibold mb-2"
            >
              Today's Task Report : 
              {/* Daily Productivity: */}
            </label>
            <textarea
              id="productivity"
              value={productivity}
              required
              onChange={handleProductivityChange}
              // placeholder="Describe your productivity for today..."
              placeholder="Provide your task report for today..."
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 border rounded-lg focus:outline-none resize-none h-32"
            ></textarea>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleCaptureImage}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 
  hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none transition duration-300"
            >
              Capture Image
            </button>
          </div>
{/* 
          {isSubmitting ? (
            <p className="text-center text-green-600 font-semibold mb-4">
              Your attendance is submitting...
            </p>
          ) : (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 
  hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md  focus:outline-none transition duration-300"
              >
                Submit
              </button>
            </div>
          )} */}

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;