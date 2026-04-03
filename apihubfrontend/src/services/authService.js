import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const register = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);

  const { token, role } = res.data;

  if (!token || !role) {
    throw new Error("Invalid response from server. Missing token or role.");
  }

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  return res.data;
};

export const getToken = () => {
  const t = localStorage.getItem("token");
  return t === "undefined" ? null : t;
};

export const getRole = () => {
  const r = localStorage.getItem("role");
  return r === "undefined" ? null : r;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};