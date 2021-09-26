
import * as types from "../types/UsersTypes";

const INITIAL_STATE = {
    getSelfUser: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    createUser: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    changeSelfUserPass: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    getSpecUserDetails: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    updateSpecUser: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    deleteSpecUser: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_SELF_USER_REQUEST:
            return {
                ...state,
                getSelfUser: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_SELF_USER_ERROR:
            return {
                ...state,
                getSelfUser: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_SELF_USER_RECEIVE:
            return {
                ...state,
                getSelfUser: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        // create user

        case types.CREATE_USER_REQUEST:
            return {
                ...state,
                createUser: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.CREATE_USER_ERROR:
            return {
                ...state,
                createUser: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.CREATE_USER_RECEIVE:
            return {
                ...state,
                createUser: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },
            };

        // change self user pass

        case types.CHANGE_SELF_USER_PASS_REQUEST:
            return {
                ...state,
                changeSelfUserPass: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.CHANGE_SELF_USER_PASS_ERROR:
            return {
                ...state,
                changeSelfUserPass: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.CHANGE_SELF_USER_PASS_RECEIVE:
            return {
                ...state,
                changeSelfUserPass: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },
            };

        // get spec users details

        case types.GET_SPEC_USER_DETAILS_REQUEST:
            return {
                ...state,
                getSpecUserDetails: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_SPEC_USER_DETAILS_ERROR:
            return {
                ...state,
                getSpecUserDetails: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_SPEC_USER_DETAILS_RECEIVE:
            return {
                ...state,
                getSpecUserDetails: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        // update specific user

        case types.UPDATE_SPEC_USER_REQUEST:
            return {
                ...state,
                updateSpecUser: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.UPDATE_SPEC_USER_ERROR:
            return {
                ...state,
                updateSpecUser: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.UPDATE_SPEC_USER_RECEIVE:
            return {
                ...state,
                updateSpecUser: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        //delete spec user



        case types.DELETE_SPEC_USER_REQUEST:
            return {
                ...state,
                deleteSpecUser: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.DELETE_SPEC_USER_ERROR:
            return {
                ...state,
                deleteSpecUser: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.DELETE_SPEC_USER_RECEIVE:
            return {
                ...state,
                deleteSpecUser: {
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