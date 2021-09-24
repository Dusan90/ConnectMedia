import { axiosInstance } from "./index";
import {
    BSC_API_URL,
    GET_LOGIN
} from './urlConsts'

// const handlerEnabled = false;

const url = endpoint => `${BSC_API_URL}${endpoint}`;



const login = async () => {
    return await axiosInstance.get(`${url(GET_LOGIN)}`, {
        //   handlerEnabled,
        params: {

        }
    });
}


export default {
    login
};
