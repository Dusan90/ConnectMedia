import * as types from "../types/SitesListTypes";


// GET SITES
export const GetSitesListActionRequest = payload => ({
    type: types.GET_SITES_LIST_REQUEST,
    payload
});

export const GetSitesListActionReceive = payload => {
    return {
        type: types.GET_SITES_LIST_RECEIVE,
        payload
    };
}

export const GetSitesListActionError = payload => ({
    type: types.GET_SITES_LIST_ERROR,
    payload
});

// CREATE SITE 

export const CreateSiteActionRequest = payload => ({
    type: types.CREATE_SITE_REQUEST,
    payload
});

export const CreateSiteActionReceive = payload => {
    return {
        type: types.CREATE_SITE_RECEIVE,
        payload
    };
}

export const CreateSiteActionError = payload => ({
    type: types.CREATE_SITE_ERROR,
    payload
});

//  GET SITE DETAILS

export const GetSiteDetailsActionRequest = payload => ({
    type: types.GET_SITE_DETAILS_REQUEST,
    payload
});

export const GetSiteDetailsActionReceive = payload => {
    return {
        type: types.GET_SITE_DETAILS_RECEIVE,
        payload
    };
}

export const GetSiteDetailsActionError = payload => ({
    type: types.GET_SITE_DETAILS_ERROR,
    payload
});

// UPDATE SITE DETAILS

export const UpdateSiteDetailsActionRequest = payload => ({
    type: types.UPDATE_SITE_DETAILS_REQUEST,
    payload
});

export const UpdateSiteDetailsActionReceive = payload => {
    return {
        type: types.UPDATE_SITE_DETAILS_RECEIVE,
        payload
    };
}

export const UpdateSiteDetailsActionError = payload => ({
    type: types.UPDATE_SITE_DETAILS_ERROR,
    payload
});

// DELETE SITE

export const DeleteSiteActionRequest = payload => ({
    type: types.DELETE_SITE_REQUEST,
    payload
});

export const DeleteSiteActionReceive = payload => {
    return {
        type: types.DELETE_SITE_RECEIVE,
        payload
    };
}

export const DeleteSiteActionError = payload => ({
    type: types.DELETE_SITE_ERROR,
    payload
});