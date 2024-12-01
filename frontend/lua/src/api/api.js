import * as React from "react";
import { AuthContext } from "../contextx/AuthContext";

const BASE_URL =  /* process.env.REACT_APP_API_BASE_URL  ||  */"http://localhost:3000"



export const registerApi = async (username, email, password, profilePic, color, birthdate) => {
  try {
    const response = await fetch(BASE_URL+"/user/reg", {
      method: "POST",
      body: JSON.stringify({username, email, password, profilePic, color, birthdate}),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    if(response.status === 201) {
      return console.log("Registration successful!!");
    } else if(response.status === 409) {
      return console.log("User already exists");
    } else if (response.status === 226) {
      return console.log("Username already taken!");
      
    } else{
      throw new Error("Registration failed!")
    }
  } catch (error) {
    console.log(error);
    
  }
}

// Log out:
export const logout = async () => {
  console.log("you've been logged out!");
  
}

// Register:

// Check Authentication:
export const checkAuth = async () => {
  try {
    const response = await api.get("/user/check-auth");
    return response.data;

  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Falls der Benutzer nicht authentifiziert ist
      return {isAuthenticated: false, msg: error.response.data.msg};
    }
    throw error; // Andernfalls Fehler weiterreichen!
  }
}
