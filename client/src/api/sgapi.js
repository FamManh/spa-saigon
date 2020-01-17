import axios from "axios";
import { isAuthenticated } from "../containers/shared/routes/permissionChecker";

const sgapi = axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}`
});

sgapi.interceptors.request.use(
    config => {
        if (isAuthenticated()) {
            config.headers["Authorization"] = "Bearer " + isAuthenticated();
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default sgapi;
