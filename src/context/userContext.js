import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "./authcontext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: serverUrl,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.warn("Token expired or invalid. Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUserData(null);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const getCurrentUserData = async () => {
    if (!serverUrl) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setUserData(null);
      return;
    }

    try {
      const result = await api.get("/user/getCurrentProfile");
      setUserData(result.data.data);
      console.log("Current user:", result.data.data);
    } catch (error) {
      console.log(
        "getCurrentUserData error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getCurrentUserData();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUserData,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
