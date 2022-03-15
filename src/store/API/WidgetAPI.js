import { axiosInstance } from "./index";
import axios from "axios";
import { API_URL, GET_WIDGET } from "./urlConsts";

// const handlerEnabled = false;

const url = (endpoint) => `${API_URL}${endpoint}`;

const getWidgetsList = async ({
  page,
  limit,
  search,
  sortName,
  sortDir,
  status,
  user,
  category,
  site,
  state,
}) => {
  return await axiosInstance.get(
    `${url(
      GET_WIDGET
    )}?page=${page}&limit=${limit}&search=${search}&sort_key=${sortName}&sort_dir=${sortDir}&filter_state=${state}&filter_site=${site}&filter_category=${category}&filter_status=${status}&filter_owner=${user}`
  );
};

const createWidget = async (payload) => {
  const objective = {
    name: payload.name,
    site: payload.site,
    status: payload.status,
    public: payload["public"],
    image: payload.image,
    description: payload.description,
    categories: payload.categories,
    sites: payload.sites,
    include: payload.include,
    minima: payload.minima,
    direct: payload.direct,
    append: payload.append,
    same_window: payload.same_window,
    ignore_impressions: payload.ignore_impressions,
    watermark: payload.watermark,
    count: payload.count,
    width: payload.width,
    height: payload.height,
    encoding: payload.encoding,
    template: payload.template,
    blacklisted_tags: payload.blacklisted_tags,
    blacklisted_sites: payload.blacklisted_sites,
    forced_posts: payload.forced_posts,
    inherit_posts_from: payload.inherit_posts_from,
  };
  let dataforSend = Object.fromEntries(
    Object.entries(objective).filter(([_, v]) => v != null)
  );
  return await axiosInstance.post(`${url(GET_WIDGET)}`, dataforSend);
};

const getWidgetDetails = async ({ id }) => {
  return await axiosInstance.get(`${url(GET_WIDGET)}/${id}`);
};

const updateWidgetDetails = async (payload) => {
  const objective = {
    name: payload.name,
    site: payload.site,
    status: payload.status,
    public: payload["public"],
    image: payload.image,
    description: payload.description,
    categories: payload.categories,
    sites: payload.sites,
    include: payload.include,
    minima: payload.minima,
    direct: payload.direct,
    append: payload.append,
    same_window: payload.same_window,
    ignore_impressions: payload.ignore_impressions,
    count: payload.count,
    width: payload.width,
    height: payload.height,
    encoding: payload.encoding,
    template: payload.template,
    blacklisted_tags: payload.blacklisted_tags,
    blacklisted_sites: payload.blacklisted_sites,
    forced_posts: payload.forced_posts,
    inherit_posts_from: payload.inherit_posts_from,
    watermark: payload.watermark,
  };
  let dataforSend = Object.fromEntries(
    Object.entries(objective).filter(([_, v]) => v != null)
  );
  return await axiosInstance.put(
    `${url(GET_WIDGET)}/${payload.id}`,
    dataforSend
  );
};

const deleteWidget = async ({ id }) => {
  return await axiosInstance.delete(`${url(GET_WIDGET)}/${id}`);
};

const viewWidget = async ({ id }) => {
  return await axiosInstance.get(`${url("/widget/")}${id}/test`);
};

export default {
  getWidgetsList,
  getWidgetDetails,
  createWidget,
  updateWidgetDetails,
  deleteWidget,
  viewWidget,
};
