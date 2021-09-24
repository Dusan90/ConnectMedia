// import { store } from "..";
// import { loader } from "../../store/actions/Loader";
// import Auth from "../../utils/Auth";

export const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
        ? false
        : true;
};

export const requestHandler = request => {
    if (isHandlerEnabled(request)) {
        // Modify request here
        // store.dispatch(loader(true));

    }
    return request;
};

export const successHandler = response => {
    if (isHandlerEnabled(response)) {
        // Handle responses
        // store.dispatch(loader(false));
    }
    return response;
};

export const errorHandler = error => {
    if (isHandlerEnabled(error.config)) {
        // store.dispatch(loader(false));
        // You can decide what you need to do to handle errors.
        // here's example for unautherized user to log them out .
        // error.response.status === 401 && Auth.signOut();
        console.log(error, 'ERROR U INTERCEPTORU', error.config);
        if (!error?.response) {
            if (!localStorage.getItem('tried_to_reload_interceptor')) {
                localStorage.setItem('tried_to_reload_interceptor', '1');
                window.location.reload();
            }
        }
        // console.log(error.response, 'error interceptor');
        error?.response?.status === 302 && window.location.reload();
    }
    return Promise.reject({ ...error });
};
