import * as types from "../types/ChartTypes";

// totals

export const TotalRequest = (payload) => ({
  type: types.GET_TOTAL_CHART_REQUEST,
  payload,
});

export const TotalReceive = (payload) => {
  return {
    type: types.GET_TOTAL_CHART_RECEIVE,
    payload,
  };
};

export const TotalError = (payload) => ({
  type: types.GET_TOTAL_CHART_ERROR,
  payload,
});

// spec site chart

export const SpecSiteChartRequest = (payload) => ({
  type: types.GET_SPEC_SITE_CHART_REQUEST,
  payload,
});

export const SpecSiteChartReceive = (payload) => {
  return {
    type: types.GET_SPEC_SITE_CHART_RECEIVE,
    payload,
  };
};

export const SpecSiteChartError = (payload) => ({
  type: types.GET_SPEC_SITE_CHART_ERROR,
  payload,
});
