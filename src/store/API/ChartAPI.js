import { axiosInstance } from "./index";

import { TOTALS, SPEC_SITE_TOTALS, API_URL } from "./urlConsts";

const url = (endpoint) => `${API_URL}${endpoint}`;

const totals = async () => {
  return await axiosInstance.get(`${url(TOTALS)}`);
};

const specSiteTotals = async ({ id }) => {
  return await axiosInstance.get(`${url(SPEC_SITE_TOTALS)}/${id}/stats`);
};

export default {
  totals,
  specSiteTotals,
};
