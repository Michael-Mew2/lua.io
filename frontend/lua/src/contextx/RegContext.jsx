import * as React from "react";
import axiosInstance from "../api/axiosInstance";

export const RegContext = React.createContext();

export const RegProvider = ({ children }) => {
  const registerNewUser = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/reg", userData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
      throw new Error(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <RegContext.Provider value={{ registerNewUser }}>
      {children}
    </RegContext.Provider>
  );
};
