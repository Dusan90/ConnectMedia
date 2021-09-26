import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Auth from "./Auth";
// import { store } from '../store';
import History from "./History";
// const urlPrefix = process.env.REACT_APP_BSC_URL_PREFIX;

// const navbarItems = {
//   user_level_1: [
//     {
//       title: 'Dodaci',
//       href: `/addons`,
//       customClass: 'addons-menu-item',
//     },
//     // {
//     //   title: 'Računi',
//     //   href: `#`,
//     //   customClass: 'invoices-menu-item',
//     // },
//   ]
// }
export const PrivateRoute = ({ component: Component, permissions, title, ...rest }) => {

    // const state = useSelector(state => state?.LoginReducer)
    // const { loading, data, error, errorData } = state?.login
    return (

        <Route
            {...rest}
            render={props => {
                // return 
                // Auth.isAuth() && permissions.split(';').includes(Auth.getRole()) ?
                // return <Component {...props} title={title} />
                //  : <Redirect to={`/`} />
                if (sessionStorage.getItem('token') && sessionStorage.getItem('isLoged') === 'true') {
                    return <Component {...props} title={title} />
                } else {
                    History.push('/')
                }
            }}
        />
    );
};

export default PrivateRoute;
