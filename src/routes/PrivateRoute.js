import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import { store } from '../store';
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
    return (
        // Show the component only when the user is logged in and have rights to see page
        // Otherwise, redirect the user to /signin page
        <Route
            {...rest}
            render={props => {
                // return 
                // Auth.isAuth() && permissions.split(';').includes(Auth.getRole()) ?
                return <Component {...props} title={title} />
                //  : <Redirect to={`/`} />
            }}
        />
    );
};

export default PrivateRoute;
