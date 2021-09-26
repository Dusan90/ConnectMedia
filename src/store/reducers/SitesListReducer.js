
import * as types from "../types/SitesListTypes";

const INITIAL_STATE = {
    getSitesList: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    createSite: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    getSiteDetails: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    updateSiteDetails: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    deleteSite: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_SITES_LIST_REQUEST:
            return {
                ...state,
                getSitesList: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_SITES_LIST_ERROR:
            return {
                ...state,
                getSitesList: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_SITES_LIST_RECEIVE:
            return {
                ...state,
                getSitesList: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        // create site

        case types.CREATE_SITE_REQUEST:
            return {
                ...state,
                createSite: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.CREATE_SITE_ERROR:
            return {
                ...state,
                createSite: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.CREATE_SITE_RECEIVE:
            return {
                ...state,
                createSite: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        // site details


        case types.GET_SITE_DETAILS_REQUEST:
            return {
                ...state,
                getSiteDetails: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_SITE_DETAILS_ERROR:
            return {
                ...state,
                getSiteDetails: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_SITE_DETAILS_RECEIVE:
            return {
                ...state,
                getSiteDetails: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        //update site details

        case types.UPDATE_SITE_DETAILS_REQUEST:
            return {
                ...state,
                updateSiteDetails: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.UPDATE_SITE_DETAILS_ERROR:
            return {
                ...state,
                updateSiteDetails: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.UPDATE_SITE_DETAILS_RECEIVE:
            return {
                ...state,
                updateSiteDetails: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        //delete site

        case types.DELETE_SITE_REQUEST:
            return {
                ...state,
                deleteSite: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.DELETE_SITE_ERROR:
            return {
                ...state,
                deleteSite: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.DELETE_SITE_RECEIVE:
            return {
                ...state,
                deleteSite: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };



        default:
            return state;
    }
};