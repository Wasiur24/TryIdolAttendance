import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register'
import Login from './Components/Login';
import UserCreated from './Components/UserCreatedSuccess';
//import Home from './Components/Home'; // Assuming you have a Home component
import Notification from './Components/Notification';
import './App.css';
// import
import Attendance from './Components/Attendance';
import Dashboard from './Components/Dashboard';
import SuccessPage from './Components/Success';
import AllAttendance from './Components/AllAttendance';
import ParticularAttendance from './Components/ParticularAttendance';
import Reg from './Components/Reg';
import UserDashboard from './Components/UserDashboard';
import UserLeaveStatus from './Components/UserLeaveStatus';
import MarkAttendance from './Components/MarkAttendance';
import AdminLeavePage from './Components/AdminLeavePage';
import MyAttendance from './Components/MyAttendance';
// import Demo from './Components/Demo';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for different components/pages */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/usercreated" element={<UserCreated/>} />
        <Route path="/allattendance" element={<AllAttendance/>} />
        <Route path="/main/:id" element={<ParticularAttendance/>} />
        <Route path="/reg" element={<Reg/>} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/user" element={<UserDashboard/>} />
        <Route path="/leave" element={<UserLeaveStatus/>} />
        <Route path="/employeeleaves" element={<AdminLeavePage/>}/>
        <Route path="/userattendance" element={<MarkAttendance/>} />
        <Route path="/notifications" element={<Notification/>} />
        <Route path="/myattendance" element={<MyAttendance/>} />
        {/* <Route path="/demo" element={<Demo/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
