import { axiosInstance } from "./index";
import axios from "axios";
import { API_URL, GET_POST } from "./urlConsts";

// const handlerEnabled = false;

const url = (endpoint) => `${API_URL}${endpoint}`;

const getPostsList = async ({
  search,
  limit,
  page,
  sortName,
  sortDir,
  status,
  user,
  category,
  site,
  state,
  first_position,
  priority,
}) => {
  return await axiosInstance.get(
    `${url(
      GET_POST
    )}?page=${page}&limit=${limit}&search=${search}&filter_priority=${priority}&filter_first_position=${first_position}&sort_key=${sortName}&sort_dir=${sortDir}&filter_state=${state}&filter_site=${site}&filter_category=${category}&filter_status=${status}&filter_owner=${user}`
  );
};

const createPost = async ({
  site,
  status,
  guid,
  title,
  link,
  image,
  timestamp,
  categories,
  description,
  author,
  content,
  priority_lifetime,
  priority,
  first_position,
  lifetime,
  is_custom,
}) => {
  const objective = {
    site,
    status,
    guid,
    title,
    link,
    image,
    timestamp,
    categories,
    description,
    author,
    content,
    priority_lifetime,
    priority,
    first_position,
    lifetime,
    is_custom,
  };
  let dataforSend = Object.fromEntries(
    Object.entries(objective).filter(([_, v]) => v != null)
  );
  return await axiosInstance.post(`${url(GET_POST)}`, dataforSend);
};

const getPostDetails = async ({ id }) => {
  return await axiosInstance.get(`${url(GET_POST)}/${id}`);
};

const updatePostDetails = async ({
  id,
  site,
  status,
  guid,
  title,
  link,
  image,
  timestamp,
  categories,
  description,
  author,
  content,
  priority_lifetime,
  priority,
  first_position,
  lifetime,
  is_custom,
}) => {
  const objective = {
    site,
    status,
    guid,
    title,
    link,
    image,
    timestamp,
    categories,
    description,
    author,
    content,
    priority_lifetime,
    priority,
    first_position,
    lifetime,
    is_custom,
  };
  let dataforSend = Object.fromEntries(
    Object.entries(objective).filter(([_, v]) => v != null)
  );
  return await axiosInstance.put(`${url(GET_POST)}/${id}`, dataforSend);
};

const deletePost = async ({ id }) => {
  return await axiosInstance.delete(`${url(GET_POST)}/${id}`);
};

export default {
  getPostsList,
  getPostDetails,
  createPost,
  updatePostDetails,
  deletePost,
};
