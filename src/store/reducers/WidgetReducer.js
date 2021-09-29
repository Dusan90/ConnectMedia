
import * as types from "../types/WidgetsTypes";

const INITIAL_STATE = {
    getWidgetsList: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    createWidget: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    getWidgetDetails: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    updateWidgetDetails: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    deleteWidget: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_WIDGETS_LIST_REQUEST:
            return {
                ...state,
                getWidgetsList: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_WIDGETS_LIST_ERROR:
            return {
                ...state,
                getWidgetsList: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_WIDGETS_LIST_RECEIVE:
            return {
                ...state,
                getWidgetsList: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        // create Widget

        case types.CREATE_WIDGET_REQUEST:
            return {
                ...state,
                createWidget: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.CREATE_WIDGET_ERROR:
            return {
                ...state,
                createWidget: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.CREATE_WIDGET_RECEIVE:
            return {
                ...state,
                createWidget: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        // Widget details


        case types.GET_WIDGET_DETAILS_REQUEST:
            return {
                ...state,
                getWidgetDetails: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_WIDGET_DETAILS_ERROR:
            return {
                ...state,
                getWidgetDetails: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_WIDGET_DETAILS_RECEIVE:
            return {
                ...state,
                getWidgetDetails: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };


        //update Widget details

        case types.UPDATE_WIDGET_DETAILS_REQUEST:
            return {
                ...state,
                updateWidgetDetails: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.UPDATE_WIDGET_DETAILS_ERROR:
            return {
                ...state,
                updateWidgetDetails: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.UPDATE_WIDGET_DETAILS_RECEIVE:
            return {
                ...state,
                updateWidgetDetails: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        //delete Widget

        case types.DELETE_WIDGET_REQUEST:
            return {
                ...state,
                deleteWidget: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.DELETE_WIDGET_ERROR:
            return {
                ...state,
                deleteWidget: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.DELETE_WIDGET_RECEIVE:
            return {
                ...state,
                deleteWidget: {
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