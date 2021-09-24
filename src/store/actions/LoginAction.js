import * as types from "../types/LoginTypes";

export const LoginActionRequest = payload => ({
    type: types.LOGIN_REQUEST,
    payload
});

export const LoginActionReceive = payload => {
    return {
        type: types.LOGIN_RECEIVE,
        payload
    };
}

export const LoginActionError = payload => ({
    type: types.LOGIN_ERROR,
    payload
});

