import axios from 'axios';

const API_BASE_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
    return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const fetchUsers = async (page = 1) => {
    return axios.get(`${API_BASE_URL}/users?page=${page}`);
};

export const updateUser = async (id, userData) => {
    return axios.put(`${API_BASE_URL}/users/${id}`, userData);
};

export const deleteUser = async (id) => {
    return axios.delete(`${API_BASE_URL}/users/${id}`);
};
