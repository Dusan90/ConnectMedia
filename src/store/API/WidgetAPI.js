import { axiosInstance } from "./index";
import axios from "axios";
import { API_URL, GET_WIDGET } from "./urlConsts";

// const handlerEnabled = false;

const url = (endpoint) => `${API_URL}${endpoint}`;

const getWidgetsList = async ({ page, limit, search }) => {
  return await axiosInstance.get(
    `${url(GET_WIDGET)}?page=${page}&limit=${limit}&search=${search}`
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
    count: payload.count,
    width: payload.width,
    height: payload.height,
    encoding: payload.encoding,
    template: payload.template,
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
