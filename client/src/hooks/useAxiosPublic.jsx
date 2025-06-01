import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6001";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

