import { axiosInstance } from "./index";
import axios from "axios";
import { API_URL, GET_SITES_LIST } from "./urlConsts";

// const handlerEnabled = false;

const url = (endpoint) => `${API_URL}${endpoint}`;

const getSitesList = async ({
  limit,
  search,
  page,
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
      GET_SITES_LIST
    )}?page=${page}&limit=${limit}&search=${search}&sort_key=${sortName}&sort_dir=${sortDir}&filter_state=${state}&filter_site=${site}&filter_category=${category}&filter_status=${status}&filter_owner=${user}`
  );
};

const createSite = async ({
  name,
  feeds,
  url,
  feed_translations,
  categories,
  state,
  description,
  head,
  encoding,
  factor,
  minimum,
  tracking,
  auto_publish,
  better_images,
  feed_definition,
  post_definition,
  refresh_interval,
  copy_from_site,
  guess_remote,
  tag_map,
  ratio,
  ratios,
  random_ratio,
  post_lifetime,
  ctr_ratio,
}) => {
  const objective = {
    name,
    url,
    feeds,
    feed_translations,
    categories,
    description,
    state,
    head,
    encoding,
    factor,
    minimum,
    tracking,
    auto_publish,
    better_images,
    feed_definition,
    post_definition,
    refresh_interval,
    copy_from_site,
    guess_remote,
    tag_map,
    ratio,
    ratios,
    random_ratio,
    post_lifetime,
    ctr_ratio,
  };
  let dataforSend = Object.fromEntries(
    Object.entries(objective).filter(([_, v]) => v != null)
  );
  return await axiosInstance.post(`${API_URL}${GET_SITES_LIST}`, dataforSend);
};

const getSiteDetails = async ({ id }) => {
  return await axiosInstance.get(`${url(GET_SITES_LIST)}/${id}`);
};

const updateSiteDetails = async ({
  id,
  name,
  feed_translations,
  feeds,
  categories,
  url,
  state,
  description,
  head,
  encoding,
  factor,
  minimum,
  tracking,
  auto_publish,
  better_images,
  feed_definition,
  post_definition,
  refresh_interval,
  copy_from_site,
  guess_remote,
  tag_map,
  ratio,
  ratios,
  random_ratio,
  post_lifetime,
  ctr_ratio,
  owner,
}) => {
  const objective = {
    name,
    url,
    feeds,
    feed_translations,
    description,
    categories,
    state,
    head,
    encoding,
    factor,
    minimum,
    tracking,
    auto_publish,
    better_images,
    feed_definition,
    post_definition,
    refresh_interval,
    copy_from_site,
    guess_remote,
    tag_map,
    ratio,
    ratios,
    random_ratio,
    post_lifetime,
    ctr_ratio,
    owner,
  };
  let dataforSend = Object.fromEntries(
    Object.entries(objective).filter(([_, v]) => v != null)
  );
  return await axiosInstance.put(
    `${API_URL}${GET_SITES_LIST}/${id}`,
    dataforSend
  );
};

const deleteSite = async ({ id }) => {
  return await axiosInstance.delete(`${url(GET_SITES_LIST)}/${id}`);
};

export default {
  getSitesList,
  getSiteDetails,
  createSite,
  updateSiteDetails,
  deleteSite,
};
