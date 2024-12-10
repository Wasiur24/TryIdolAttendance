import API from "./axios";

export const login = async (formData) => {
  return API.post("/auth/login",formData);
};

export const register = async (formData) => {
    return API.post("/auth/register", formData);
};

export const AllEmployee = async () => {
    return API.get("/auth/all");
};

export const deleteUser = async (id) => {
    return API.delete(`/auth/delete/${id}`);
  };

  export const EditUser = async () => {
    const updatedUser = { ...editingUser };
    return API.put(`/auth/update/${editingUser._id}`, updatedUser);
  };

