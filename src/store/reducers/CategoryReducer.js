
import * as types from "../types/CategoryTypes";

const INITIAL_STATE = {
    getCategoryList: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    createCategory: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    getCategoryDetails: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    updateCategoryDetails: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    deleteCategory: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    bindCategory: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    unbindCategory: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_CATEGORY_LIST_REQUEST:
            return {
                ...state,
                getCategoryList: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_CATEGORY_LIST_ERROR:
            return {
                ...state,
                getCategoryList: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_CATEGORY_LIST_RECEIVE:
            return {
                ...state,
                getCategoryList: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        // create Category

        case types.CREATE_CATEGORY_REQUEST:
            return {
                ...state,
                createCategory: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.CREATE_CATEGORY_ERROR:
            return {
                ...state,
                createCategory: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.CREATE_CATEGORY_RECEIVE:
            return {
                ...state,
                createCategory: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        // Category details


        case types.GET_CATEGORY_DETAILS_REQUEST:
            return {
                ...state,
                getCategoryDetails: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_CATEGORY_DETAILS_ERROR:
            return {
                ...state,
                getCategoryDetails: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_CATEGORY_DETAILS_RECEIVE:
            return {
                ...state,
                getCategoryDetails: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        //update Category details

        case types.UPDATE_CATEGORY_DETAILS_REQUEST:
            return {
                ...state,
                updateCategoryDetails: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.UPDATE_CATEGORY_DETAILS_ERROR:
            return {
                ...state,
                updateCategoryDetails: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.UPDATE_CATEGORY_DETAILS_RECEIVE:
            return {
                ...state,
                updateCategoryDetails: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        //delete Category

        case types.DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                deleteCategory: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.DELETE_CATEGORY_ERROR:
            return {
                ...state,
                deleteCategory: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.DELETE_CATEGORY_RECEIVE:
            return {
                ...state,
                deleteCategory: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };



        //bind category

        case types.BIND_CATEGORY_REQUEST:
            return {
                ...state,
                bindCategory: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.BIND_CATEGORY_ERROR:
            return {
                ...state,
                bindCategory: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.BIND_CATEGORY_RECEIVE:
            return {
                ...state,
                bindCategory: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        // unbind category

        case types.UNBIND_CATEGORY_REQUEST:
            return {
                ...state,
                unbindCategory: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.UNBIND_CATEGORY_ERROR:
            return {
                ...state,
                unbindCategory: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.UNBIND_CATEGORY_RECEIVE:
            return {
                ...state,
                unbindCategory: {
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