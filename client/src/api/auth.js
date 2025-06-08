import axios from "axios";
import { mockAllUsers } from "../data/mockAllUsers";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function login(username, password) {
  const user = mockAllUsers.find(u => u.username === username && u.password === password);
  if (user) {
    return Promise.resolve(user);
  }
  // const res = await axios.post(`${API_BASE}/auth/login`, { username, password });
  // return res.data;
  return Promise.reject(new Error("Invalid credentials"));
}

export async function register(data) {
  // return axios.post(`${API_BASE}/auth/register`, data);
  console.log("Would register user", data);
  return Promise.resolve();
}
