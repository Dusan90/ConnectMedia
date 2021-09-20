import React from "react";

function retry(fn, retriesLeft = 2, interval = 1000) {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (retriesLeft === 1) {
                        if (!error?.response) {
                            window.location.reload();
                        }

                        reject(error);
                        return;
                    }
                    retry(fn, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
}

export const Home = React.lazy(() => retry(() => import('../components/Home/Home')));
// export const Login = React.lazy(() => retry(() => import('../components/Login/Login')));
export const SiteDetails = React.lazy(() => retry(() => import('../components/SiteDetails/SiteDetails')));
export const Stats = React.lazy(() => retry(() => import('../components/Stats/Stats')));
export const Posts = React.lazy(() => retry(() => import('../components/Posts/Posts')));
export const Widgets = React.lazy(() => retry(() => import('../components/Widgets/Widgets')));
export const WidgetsDetails = React.lazy(() => retry(() => import('../components/WidgetsDetails/WidgetsDetails')));
export const Categories = React.lazy(() => retry(() => import('../components/Categories/Categories')));
export const CategoriesDetails = React.lazy(() => retry(() => import('../components/CategoriesDetails/CategoriesDetails')));
export const Totals = React.lazy(() => retry(() => import('../components/Totals/Totals')));
export const Users = React.lazy(() => retry(() => import('../components/Users/Users')));
export const UsersDetails = React.lazy(() => retry(() => import('../components/UsersDetails/UsersDetails')));
export const PostsDetails = React.lazy(() => retry(() => import('../components/PostsDetails/PostsDetails')));
export const NotFound = React.lazy(() => retry(() => import('../components/NotFound/NotFound')));
