import * as types from "../types/LoginTypes";


// LOGIN
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

// LOGOUT

export const LogoutActionRequest = payload => ({
    type: types.LOGOUT_REQUEST,
    payload
});

export const LogoutActionReceive = payload => {
    return {
        type: types.LOGOUT_RECEIVE,
        payload
    };
}

export const LogoutActionError = payload => ({
    type: types.LOGOUT_ERROR,
    payload
});

