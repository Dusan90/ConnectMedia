import { axiosInstance } from "./index";
import axios from 'axios'
import {
    API_URL,
    GET_STATS,

} from './urlConsts'

// const handlerEnabled = false;

const url = endpoint => `${API_URL}${endpoint}`;

const getStats = async () => {
    return await axiosInstance.get(`${url(GET_STATS)}`)
}




export default {
    getStats
};
