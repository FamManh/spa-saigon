import axios from "axios";
import {isAuthenticated} from '../containers/shared/routes/permissionChecker';

export default axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}`,
    headers: {
        Authorization:
            `Bearer ${isAuthenticated() ? isAuthenticated() : ''}` 
    }
});
