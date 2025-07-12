
const formdataConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
};
const jsonConfig = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};
const defaultConfig = {
    withCredentials: true,
};

import axios from "axios";
import useAuthStore from "@/store/authSlice";

const axioInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
});




axioInstance.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().auth?.userData?.accessToken;
        if (!accessToken) {
            return config;
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

class Axios {
    async get(url) {
        try {
            const response = await axioInstance.get(url, defaultConfig);
            return response?.data;
        } catch (error) {
            console.log("error", error)
            return error.response?.data;
        }
    }
    async post(url, data = {}) {
        try {
            const config = data instanceof FormData ? formdataConfig : jsonConfig;
            const response = await axioInstance.post(url, data, config);
            return response?.data;
        } catch (error) {
            return error.response?.data;
        }
    }
    async patch(url, data) {
        try {
            const config = data instanceof FormData ? formdataConfig : jsonConfig;
            const response = await axioInstance.patch(url, data, config);
            return response?.data;
        } catch (error) {
            return error.response?.data;
        }
    }
    async delete(url) {
        try {
            const response = await axioInstance.delete(url, defaultConfig);

            return response?.data;
        } catch (error) {
            return error.response?.data;
        }
    }
}
export default new Axios();
