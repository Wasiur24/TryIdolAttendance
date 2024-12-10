import API from "./axios";

export const Myleave = async () => {
  return API.get("/leave/my-leaves");
};

export const createLeave = async (newLeaveRequest) => {
    return API.post("/leave/",newLeaveRequest);
};

export const getAllLeaves = async () => {
    return API.get("/leave/");
};

// export const DoLeave = async (leaveId, action) => {
//     return API.put(`/leave/${leaveId}`,{
//         status: action,
//       });
//   };
export const DoLeave = async (leaveId, action) => {
    return API.put(`/leave/${leaveId}`, {
      status: action,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  
