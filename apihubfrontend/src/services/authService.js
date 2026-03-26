import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const register = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);

  localStorage.setItem("token", res.data);

  return res.data;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};