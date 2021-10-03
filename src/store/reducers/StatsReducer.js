import * as types from "../types/StatsTypes";

const INITIAL_STATE = {
    getStats: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
}



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_STATS_REQUEST:
            return {
                ...state,
                getStats: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.GET_STATS_ERROR:
            return {
                ...state,
                getStats: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.GET_STATS_RECEIVE:
            return {
                ...state,
                getStats: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        default:
            return state;
    }
}