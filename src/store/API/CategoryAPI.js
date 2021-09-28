import { axiosInstance } from "./index";
import axios from 'axios'
import {
    API_URL,
    GET_CATEGORY,

} from './urlConsts'

// const handlerEnabled = false;

const url = endpoint => `${API_URL}${endpoint}`;

const getCategoryList = async () => {
    return await axiosInstance.get(`${url(GET_CATEGORY)}`)
}

const createCategory = async ({ name, adult, rename, merge, description }) => {
    return await axiosInstance.post(`${url(GET_CATEGORY)}`, {
        name,
        description,
        adult,
        rename,
        merge
    })
}

const getCategoryDetails = async ({ id }) => {
    return await axiosInstance.get(`${url(GET_CATEGORY)}/${id}`)
}

const updateCategoryDetails = async ({ id, name, adult, rename, merge, description }) => {
    const formData = new FormData();
    { name && formData.append('name', name); }
    { adult && formData.append('adult', adult); }
    { description && formData.append('description', description) }
    { rename && formData.append('rename', rename) }
    { merge && formData.append('merge', merge) }

    return await axios.put(`${API_URL}${GET_CATEGORY}/${id}`, formData, {
        headers: {
            Authorization: sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    });
}

const deleteSite = async ({ id }) => {
    return await axiosInstance.delete(`${url(GET_CATEGORY)}/${id}`)
}

export default {
    getCategoryList,
    getCategoryDetails,
    createCategory,
    updateCategoryDetails,
    deleteSite
};
