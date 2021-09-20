import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import * as Pages from "./Pages";
import PrivateRoute from "./PrivateRoute";
import history from './History'
import Login from '../components/Login/Login'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'


// const urlPrefix = process.env.REACT_APP_BSC_URL_PREFIX;

const pageComponentMap = {
    Home: Pages.Home,
    // Login: Pages.Login,
    SiteDetails: Pages.SiteDetails,
    Stats: Pages.Stats,
    Posts: Pages.Posts,
    Widgets: Pages.Widgets,
    Users: Pages.Users,
    Categories: Pages.Categories,
    Totals: Pages.Totals,
    PostsDetails: Pages.PostsDetails,
    WidgetsDetails: Pages.WidgetsDetails,
    UsersDetails: Pages.UsersDetails,
    CategoriesDetails: Pages.CategoriesDetails
};

const routesList = [
    {
        permissions: null,
        path: `/sites`,
        page: 'Home',
        title: 'Home page',
    },
    {
        permissions: null,
        path: `/stats`,
        page: 'Stats',
        title: 'Stats',
    },
    {
        permissions: null,
        path: `/sites/:id`,
        page: 'SiteDetails',
        title: 'SiteDetails',
    },
    {
        permissions: null,
        path: `/posts`,
        page: 'Posts',
        title: 'Posts',
    },
    {
        permissions: null,
        path: `/widgets`,
        page: 'Widgets',
        title: 'Widgets',
    },
    {
        permissions: null,
        path: `/widgets/:id`,
        page: 'WidgetsDetails',
        title: 'WidgetsDetails',
    },
    {
        permissions: null,
        path: `/users`,
        page: 'Users',
        title: 'Users',
    },
    {
        permissions: null,
        path: `/users/:id`,
        page: 'UsersDetails',
        title: 'UsersDetails',
    },
    {
        permissions: null,
        path: `/categories`,
        page: 'Categories',
        title: 'Categories',
    },
    {
        permissions: null,
        path: `/categories/:id`,
        page: 'CategoriesDetails',
        title: 'CategoriesDetails',
    },
    {
        permissions: null,
        path: `/totals`,
        page: 'Totals',
        title: 'Totals',
    },
    {
        permissions: null,
        path: `/posts/:id`,
        page: 'PostsDetails',
        title: 'PostsDetails',
    },

];



const Routes = (
    <>
        <Route path={['/sites', '/stats', '/sites/:id', '/posts', '/widgets', '/widgets/:id', '/users', '/users/:id', '/categories', '/categories/:id', '/totals', '/posts/:id']} component={Header} />
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path={'/'} component={Login} exact />
                {routesList.map(route => {
                    const { permissions, path, page, title } = route;
                    const ComponentToShow = pageComponentMap[page];
                    // if (!permissions) {
                    //     return <ComponentToShow path={path} key={route.title} exact />
                    // } else {
                    //     return <PrivateRoute permissions={permissions} key={route.title} component={ComponentToShow} path={path} title={title} exact />
                    // }
                    return <PrivateRoute permissions={permissions} key={route.title} component={ComponentToShow} path={path} title={title} exact />
                })}

                <Pages.NotFound path="**" title="This page doesn't exist..." exact />
            </Switch>
        </Suspense>
        <Footer />
    </>
);

export default Routes;
