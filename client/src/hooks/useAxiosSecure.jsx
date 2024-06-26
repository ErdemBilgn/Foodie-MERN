import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

function useAxiosSecure() {
  const navigate = useNavigate();
  const { logout } = UseAuth;

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await logout();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}

export default useAxiosSecure;
