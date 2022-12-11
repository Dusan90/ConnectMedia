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
  custom_only,
}) => {
  return await axiosInstance.get(
    `${url(
      GET_POST
    )}?page=${page}&limit=${limit}&search=${search}&custom_only=${custom_only}&filter_priority=${priority}&filter_first_position=${first_position}&sort_key=${sortName}&sort_dir=${sortDir}&filter_state=${state}&filter_site=${site}&filter_category=${category}&filter_status=${status}&filter_owner=${user}`
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
    // image,
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

  const convertToBase64 = (file) => {
    if (typeof file === "string") {
      return image;
    } else {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

  const base64 = await convertToBase64(image);

  console.log(base64, "helloooo");

  return await axiosInstance.post(`${url(GET_POST)}`, {
    ...dataforSend,
    image: base64,
  });
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
    // image,
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

  const convertToBase64 = (file) => {
    if (typeof file === "string") {
      return image;
    } else {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

  const base64 = await convertToBase64(image);

  return await axiosInstance.put(`${url(GET_POST)}/${id}`, {
    ...dataforSend,
    image: base64,
  });
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
