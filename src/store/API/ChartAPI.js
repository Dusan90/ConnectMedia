import { axiosInstance } from "./index";

import {
  TOTALS,
  SPEC_SITE_TOTALS,
  API_URL,
  SPEC_WIDGET_TOTALS,
  SPEC_POST_TOTALS,
} from "./urlConsts";

const url = (endpoint) => `${API_URL}${endpoint}`;

const totals = async () => {
  return await axiosInstance.get(`${url(TOTALS)}`);
};

const specSiteTotals = async ({ id }) => {
  return await axiosInstance.get(`${url(SPEC_SITE_TOTALS)}/${id}/stats`);
};

const specWidgetTotals = async ({ id }) => {
  return await axiosInstance.get(`${url(SPEC_WIDGET_TOTALS)}/${id}/stats`);
};

const specPostTotals = async ({ id }) => {
  return await axiosInstance.get(`${url(SPEC_POST_TOTALS)}/${id}/stats`);
};

export default {
  totals,
  specSiteTotals,
  specWidgetTotals,
  specPostTotals,
};
