import { axiosInstance } from "./index";
import {
    API_URL,
    GET_SITES_LIST,

} from './urlConsts'

// const handlerEnabled = false;

const url = endpoint => `${API_URL}${endpoint}`;

const getSitesList = async () => {
    return await axiosInstance.get(`${url(GET_SITES_LIST)}`)
}

const createSite = async ({ name, url, description, head, encoding, factor, minimum, tracking, auto_publish, better_images, feed_definition, post_definition, refresh_interval, copy_from_site, guess_remote, tag_map }) => {
    return await axiosInstance.post(`${url(GET_SITES_LIST)}`, {
        name,
        url,
        description,
        head,
        encoding,
        factor,
        minimum,
        tracking,
        auto_publish,
        better_images,
        feed_definition,
        post_definition,
        refresh_interval,
        copy_from_site,
        guess_remote,
        tag_map
    })
}

const getSiteDetails = async ({ id }) => {
    return await axiosInstance.get(`${url(GET_SITES_LIST)}/${id}`)
}

const updateSiteDetails = async ({ id, name, url, description, head, encoding, factor, minimum, tracking, auto_publish, better_images, feed_definition, post_definition, refresh_interval, copy_from_site, guess_remote, tag_map }) => {
    return await axiosInstance.put(`${url(GET_SITES_LIST)}/${id}`, {
        name,
        url,
        description,
        head,
        encoding,
        factor,
        minimum,
        tracking,
        auto_publish,
        better_images,
        feed_definition,
        post_definition,
        refresh_interval,
        copy_from_site,
        guess_remote,
        tag_map
    })
}

const deleteSite = async ({ id }) => {
    return await axiosInstance.delete(`${url(GET_SITES_LIST)}/${id}`)
}

export default {
    getSitesList,
    getSiteDetails,
    createSite,
    updateSiteDetails,
    deleteSite
};
