import * as types from "../types/LoginTypes";

export const LoginActionRequest = () => ({
    type: types.LOGIN_REQUEST
});

export const LoginActionReceive = payload => {
    return {
        type: types.LOGIN_RECEIVE,
        payload
    };
}

export const LoginActionError = () => ({
    type: types.LOGIN_ERROR,
});

