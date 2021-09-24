import { axiosInstance } from "./index";
import {
    API_URL,
    GET_LOGIN
} from './urlConsts'

// const handlerEnabled = false;

const url = endpoint => `${API_URL}${endpoint}`;

const login = async ({ mail, password }) => {
    return await axiosInstance.post(`${url(GET_LOGIN)}`, {
        //   handlerEnabled,
        mail: mail,
        pawd: password
    });
}


export default {
    login
};
