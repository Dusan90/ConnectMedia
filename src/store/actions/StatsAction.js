import * as types from "../types/StatsTypes";


// GET STATS
export const GetStatsActionRequest = payload => {
    return {
        type: types.GET_STATS_REQUEST,
        payload
    }
};

export const GetStatsActionReceive = payload => {
    return {
        type: types.GET_STATS_RECEIVE,
        payload
    };
}

export const GetStatsActionError = payload => {
    return {
        type: types.GET_STATS_ERROR,
        payload
    }
};