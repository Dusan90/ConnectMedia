import * as types from "../types/SitesListTypes";


// GET SITES
export const GetSitesListActionRequest = payload => {
    return {
        type: types.GET_SITES_LIST_REQUEST,
        payload
    }
};

export const GetSitesListActionReceive = payload => {
    return {
        type: types.GET_SITES_LIST_RECEIVE,
        payload
    };
}

export const GetSitesListActionError = payload => {
    return {
        type: types.GET_SITES_LIST_ERROR,
        payload
    }
};

// CREATE SITE 

export const CreateSiteActionRequest = payload => {
    return {
        type: types.CREATE_SITE_REQUEST,
        payload
    }
};

export const CreateSiteActionReceive = payload => {
    return {
        type: types.CREATE_SITE_RECEIVE,
        payload
    };
}

export const CreateSiteActionError = payload => {
    return {
        type: types.CREATE_SITE_ERROR,
        payload
    }
};

//  GET SITE DETAILS

export const GetSiteDetailsActionRequest = payload => {
    return {
        type: types.GET_SITE_DETAILS_REQUEST,
        payload
    }
};

export const GetSiteDetailsActionReceive = payload => {
    return {
        type: types.GET_SITE_DETAILS_RECEIVE,
        payload
    };
}

export const GetSiteDetailsActionError = payload => {
    return {
        type: types.GET_SITE_DETAILS_ERROR,
        payload
    }
};

// UPDATE SITE DETAILS

export const UpdateSiteDetailsActionRequest = payload => {
    return {
        type: types.UPDATE_SITE_DETAILS_REQUEST,
        payload
    }
};

export const UpdateSiteDetailsActionReceive = payload => {
    return {
        type: types.UPDATE_SITE_DETAILS_RECEIVE,
        payload
    };
}

export const UpdateSiteDetailsActionError = payload => {
    return {
        type: types.UPDATE_SITE_DETAILS_ERROR,
        payload
    }
};

// DELETE SITE

export const DeleteSiteActionRequest = payload => {
    return {
        type: types.DELETE_SITE_REQUEST,
        payload
    }
};

export const DeleteSiteActionReceive = payload => {
    return {
        type: types.DELETE_SITE_RECEIVE,
        payload
    };
}

export const DeleteSiteActionError = payload => {
    return {
        type: types.DELETE_SITE_ERROR,
        payload
    }
};