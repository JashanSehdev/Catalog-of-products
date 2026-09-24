'use client'
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== "undefined") {
//         window.cookieStore.delete('access_token');
//         window.localStorage.setItem('user', "")
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );
export default api; 