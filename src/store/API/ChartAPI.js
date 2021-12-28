import { axiosInstance } from "./index";

import {
  TOTALS,
  SPEC_SITE_TOTALS,
  API_URL,
  SPEC_WIDGET_TOTALS,
  SPEC_POST_TOTALS,
} from "./urlConsts";

const url = (endpoint) => `${API_URL}${endpoint}`;

const totals = async ({ from, to }) => {
  return await axiosInstance.get(`${url(TOTALS)}?from=${from}&to=${to}`);
};

const specSiteTotals = async ({ id, from, to }) => {
  return await axiosInstance.get(
    `${url(SPEC_SITE_TOTALS)}/${id}/stats?from=${from}&to=${to}`
  );
};

const specWidgetTotals = async ({ id, from, to }) => {
  return await axiosInstance.get(
    `${url(SPEC_WIDGET_TOTALS)}/${id}/stats?from=${from}&to=${to}`
  );
};

const specPostTotals = async ({ id, from, to }) => {
  return await axiosInstance.get(
    `${url(SPEC_POST_TOTALS)}/${id}/stats?from=${from}&to=${to}`
  );
};

export default {
  totals,
  specSiteTotals,
  specWidgetTotals,
  specPostTotals,
};
