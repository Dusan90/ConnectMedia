
import * as types from "../types/LoginTypes";
// import Auth from '../../utils/Auth';

const INITIAL_STATE = {
    login: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
    logOut: {
        error: false,
        errorData: null,
        data: null,
        loading: false,
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.LOGIN_ERROR:
            //   Auth.signOut();
            return {
                ...state,
                login: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.LOGIN_RECEIVE:
            //   Auth.setSessionDataToStorage(action.payload);
            return {
                ...state,
                login: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                },

            };

        //logout

        case types.LOGOUT_REQUEST:
            return {
                ...state,
                logOut: {
                    error: false,
                    errorData: null,
                    data: null,
                    loading: true,
                },
            };
        case types.LOGOUT_ERROR:
            //   Auth.signOut();
            return {
                ...state,
                logOut: {
                    error: true,
                    errorData: action.payload,
                    data: null,
                    loading: false,
                },
            };
        case types.LOGOUT_RECEIVE:
            //   Auth.setSessionDataToStorage(action.payload);
            return {
                ...state,
                logOut: {
                    error: false,
                    errorData: null,
                    data: action.payload,
                    loading: false,
                }
            }


        default:
            return state;
    }
};
