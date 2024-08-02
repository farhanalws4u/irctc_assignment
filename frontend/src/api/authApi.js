import axios from "axios";

const url = "http://localhost:5000";
export const registerUser = async (userData) => {
  return await axios.post(`${url}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${url}/auth/login`, userData);
};
