import API from "./axios";

export const MyAlerts = async () => {
  return API.get("/alert/my-alerts");
};

export const AllALerts = async () => {
    return API.get("/alert/all");
};

export const GenerateAlert = async (newAlert) => {
    return API.post("/alert",{
            ...newAlert,
            targetUser: newAlert.targetUser === "all" ? null : newAlert.targetUser, // Send null for "For All" option
          });
  };
