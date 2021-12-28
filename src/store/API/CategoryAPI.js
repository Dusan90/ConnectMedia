import { axiosInstance } from "./index";
import axios from "axios";
import { API_URL, GET_CATEGORY } from "./urlConsts";

// const handlerEnabled = false;

const url = (endpoint) => `${API_URL}${endpoint}`;

const getCategoryList = async ({
  page,
  search,
  limit,
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
      GET_CATEGORY
    )}?page=${page}&limit=${limit}&search=${search}&sort_key=${sortName}&sort_dir=${sortDir}&filter_state=${state}&filter_site=${site}&filter_category=${category}&filter_status=${status}&filter_owner=${user}`
  );
};

const createCategory = async ({ name, adult, rename, merge, description }) => {
  return await axiosInstance.post(`${url(GET_CATEGORY)}`, {
    name,
    description,
    adult,
    rename,
    merge,
  });
};

const getCategoryDetails = async ({ id }) => {
  return await axiosInstance.get(`${url(GET_CATEGORY)}/${id}`);
};

// const updateCategoryDetails = async ({ id, name, adult, rename, merge, description }) => {
//     const formData = new FormData();
//     { name && formData.append('name', name); }
//     { adult && formData.append('adult', adult); }
//     { description && formData.append('description', description) }
//     { rename && formData.append('rename', rename) }
//     { merge && formData.append('merge', merge) }

//     return await axios.put(`${API_URL}${GET_CATEGORY}/${id}`, formData, {
//         headers: {
//             Authorization: sessionStorage.getItem('token'),
//             "Content-Type": "application/json",
//         }
//     });
// }

const updateCategoryDetails = async ({
  id,
  name,
  adult,
  rename,
  merge,
  description,
}) => {
  const objective = { name, adult, rename, merge, description };
  let dataforSend = Object.fromEntries(
    Object.entries(objective).filter(([_, v]) => v != null)
  );

  return await axiosInstance.put(`${url(GET_CATEGORY)}/${id}`, dataforSend);
};

const deleteCategory = async ({ id }) => {
  return await axiosInstance.delete(`${url(GET_CATEGORY)}/${id}`);
};

const bindCategory = async ({ siteId, categoryId }) => {
  return await axiosInstance.post(
    `${url(GET_CATEGORY)}/binding/${siteId}/${categoryId}`
  );
};

const unbindCategory = async ({ siteId, categoryId }) => {
  return await axiosInstance.delete(
    `${url(GET_CATEGORY)}/binding/${siteId}/${categoryId}`
  );
};

export default {
  getCategoryList,
  getCategoryDetails,
  createCategory,
  updateCategoryDetails,
  deleteCategory,
  bindCategory,
  unbindCategory,
};
