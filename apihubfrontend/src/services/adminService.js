import axios from "axios";

const API = "http://localhost:8080/admin";

const getToken = () => localStorage.getItem("token");

export const getUsers = () => {
    return axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const deleteUser = (id) => {
    return axios.delete(`${API}/user/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const getApis = () => {
    return axios.get(`${API}/apis`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const deleteApi = (id) => {
    return axios.delete(`${API}/api/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};