import { axiosInstance } from "./index";
import {
    API_URL,
    GET_SELF_USER,

} from './urlConsts'

// const handlerEnabled = false;

const url = endpoint => `${API_URL}${endpoint}`;

// get current user data

const getSelfUser = async () => {
    return await axiosInstance.get(`${url(GET_SELF_USER)}`)
}

//create new user

const createUser = async ({ mail, password, name }) => {
    return await axiosInstance.post(`${url(GET_SELF_USER)}`, {
        mail: mail,
        pawd: password,
        name
    })
}


// change self user password

const changeSelfUserPass = async ({ newPassword, password }) => {
    return await axiosInstance.put(`${url(GET_SELF_USER)}`, {
        new: newPassword,
        current: password
    })
}


// get specific users details

const getSpecUserDetails = async ({ id }) => {
    return await axiosInstance.get(`${url(GET_SELF_USER)}/${id}`)
}

// update specific user

const updateSpecUser = async ({ value, id }) => {
    return await axiosInstance.put(`${url(GET_SELF_USER)}/${id}`, {
        new: value
    })
}

// delete specific user

const deleteSpecUser = async ({ id }) => {
    return await axiosInstance.delete(`${url(GET_SELF_USER)}/${id}`)
}

export default {
    getSelfUser,
    createUser,
    changeSelfUserPass,
    getSpecUserDetails,
    updateSpecUser,
    deleteSpecUser
};
