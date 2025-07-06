import React, { useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const fetchProtectedData = async () => {
  try {
    const response = await axiosInstance.get("/protected-view");
    console.log("Success: ", response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

const Dashboard = () => {
  useEffect(() => {
    fetchProtectedData();
  }, []);

  return <div className="text-light container">Dashboard</div>;
};

export default Dashboard;
