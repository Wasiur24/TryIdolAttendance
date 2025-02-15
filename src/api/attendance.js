import API from "./axios";

export const getAllAttendance = async () => API.get("/attendance");
export const markAttendance = async (data) => API.post("/attendance/mark", data);
export const particularAttendance = async (id) =>
  API.get(`/attendance/${id}`);

export const AttendanceData = async (id,attendanceStatus) => API.put(`/attendance/approve/${id}`,{ attendanceStatus });


// export const deleteCategory = async (id) =>
//   API.delete(`/category/${id}`);