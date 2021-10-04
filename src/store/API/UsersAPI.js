import { axiosInstance } from "./index";
import axios from 'axios'
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

// get list of users

const geUsersList = async () => {
    return await axiosInstance.get(`${url(GET_SELF_USER)}/index`)
}

//create new user

// const createUser = async ({ mail, password, name }) => {
//     return await axiosInstance.post(`${url(GET_SELF_USER)}`, {
//         mail: mail,
//         pawd: password,
//         name
//     })
// }


const createUser = async ({ name, email, password, roles, company, address, city, country, contact, phone, vat }) => {
    const formData = new FormData();
    { name && formData.append('name', name); }
    { email && formData.append('email', email); }
    { password && formData.append('password', password) }
    { roles && formData.append('roles', roles) }
    { company && formData.append('company', company) }
    { address && formData.append('address', address) }
    { city && formData.append('city', city) }
    { country && formData.append('country', country) }
    { contact && formData.append('contact', contact) }
    { phone && formData.append('phone', phone) }
    { vat && formData.append('vat', vat) }
    const data = {
        name,
        email,
        password,
        roles,
        company,
        address,
        city,
        country,
        contact,
        phone,
        vat,
    }
    return await axios.post(`${API_URL}${GET_SELF_USER}`, data, {
        headers: {
            Authorization: sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    });
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

const updateSpecUser = async ({ id, name, email, password, roles, company, address, city, country, contact, phone, vat }) => {
    const objective = { address, city, company, contact, country, email, name, vat, phone, roles }
    let dataforSend = Object.fromEntries(Object.entries(objective).filter(([_, v]) => v != null));

    return await axiosInstance.put(`${url(GET_SELF_USER)}/${id}`, dataforSend)
}

// const updateSpecUser = async ({ id, name, email, password, roles, company, address, city, country, contact, phone, vat }) => {
//     console.log(roles, 'ovo je roles array');
//     const formData = new FormData();
//     { name && formData.append('name', name); }
//     { email && formData.append('email', email); }
//     { password && formData.append('password', password) }
//     { roles && formData.append('roles', JSON.stringify({ roles })) }
//     { company && formData.append('company', company) }
//     { address && formData.append('address', address) }
//     { city && formData.append('city', city) }
//     { country && formData.append('country', country) }
//     { contact && formData.append('contact', contact) }
//     { phone && formData.append('phone', phone) }
//     { vat && formData.append('vat', vat) }
//     return await axios.put(`${API_URL}${GET_SELF_USER}/${id}`, formData, {
//         headers: {
//             Authorization: sessionStorage.getItem('token'),
//             "Content-Type": "application/json",
//         }
//     });
// }

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
    deleteSpecUser,
    geUsersList
};
