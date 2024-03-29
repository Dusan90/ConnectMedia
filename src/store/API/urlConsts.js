export const API_URL = (() => {
  return process.env.REACT_APP_API_URL_PREFIX
    ? process.env.REACT_APP_API_URL_PREFIX
    : "/api/v1";
})();
// export const API_URL = process.env.REACT_APP_API_URL_PREFIX;

//login
export const GET_LOGIN = "/auth";

// get sites list

export const GET_SITES_LIST = "/site";

// Users

export const GET_SELF_USER = "/user";

// Category

export const GET_CATEGORY = "/category";

// Posts

export const GET_POST = "/post";

// widget

export const GET_WIDGET = "/widget";

// stats

export const GET_STATS = "/stats";

// totals and chartSaga

export const TOTALS = "/totals";
export const SPEC_SITE_TOTALS = "/site"; // /site/<site id>/stats'
export const SPEC_WIDGET_TOTALS = "/widget";
export const SPEC_POST_TOTALS = "/post";
