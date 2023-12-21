import * as types from "../types/PostsTypes";

const INITIAL_STATE = {
  getPostsList: {
    error: false,
    errorData: null,
    data: null,
    loading: false,
  },
  createPost: {
    error: false,
    errorData: null,
    data: null,
    loading: false,
  },
  getPostDetails: {
    error: false,
    errorData: null,
    data: null,
    loading: false,
  },
  getPostDetailsStatsPromo: {
    error: false,
    errorData: null,
    data: null,
    loading: false,
  },
  updatePostDetails: {
    error: false,
    errorData: null,
    data: null,
    loading: false,
  },
  deletePost: {
    error: false,
    errorData: null,
    data: null,
    loading: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_POSTS_LIST_REQUEST:
      return {
        ...state,
        getPostsList: {
          error: false,
          errorData: null,
          data: null,
          loading: true,
        },
      };
    case types.GET_POSTS_LIST_ERROR:
      return {
        ...state,
        getPostsList: {
          error: true,
          errorData: action.payload,
          data: null,
          loading: false,
        },
      };
    case types.GET_POSTS_LIST_RECEIVE:
      return {
        ...state,
        getPostsList: {
          error: false,
          errorData: null,
          data: action.payload,
          loading: false,
        },
      };

    // create Post

    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        createPost: {
          error: false,
          errorData: null,
          data: null,
          loading: true,
        },
      };
    case types.CREATE_POST_ERROR:
      return {
        ...state,
        createPost: {
          error: true,
          errorData: action.payload,
          data: null,
          loading: false,
        },
      };
    case types.CREATE_POST_RECEIVE:
      return {
        ...state,
        createPost: {
          error: false,
          errorData: null,
          data: action.payload,
          loading: false,
        },
      };

    // Post details

    case types.GET_POST_DETAILS_REQUEST:
      return {
        ...state,
        getPostDetails: {
          error: false,
          errorData: null,
          data: null,
          loading: true,
        },
      };
    case types.GET_POST_DETAILS_ERROR:
      return {
        ...state,
        getPostDetails: {
          error: true,
          errorData: action.payload,
          data: null,
          loading: false,
        },
      };
    case types.GET_POST_DETAILS_RECEIVE:
      return {
        ...state,
        getPostDetails: {
          error: false,
          errorData: null,
          data: action.payload,
          loading: false,
        },
      };

    // get posts details stas promo

    case types.GET_POST_DETAILS_STATS_PROMO_REQUEST:
      return {
        ...state,
        getPostDetailsStatsPromo: {
          error: false,
          errorData: null,
          data: null,
          loading: true,
        },
      };
    case types.GET_POST_DETAILS_STATS_PROMO_ERROR:
      return {
        ...state,
        getPostDetailsStatsPromo: {
          error: true,
          errorData: action.payload,
          data: null,
          loading: false,
        },
      };
    case types.GET_POST_DETAILS_STATS_PROMO_RECEIVE:
      return {
        ...state,
        getPostDetailsStatsPromo: {
          error: false,
          errorData: null,
          data: action.payload,
          loading: false,
        },
      };

    //update Post details

    case types.UPDATE_POST_DETAILS_REQUEST:
      return {
        ...state,
        updatePostDetails: {
          error: false,
          errorData: null,
          data: null,
          loading: true,
        },
      };
    case types.UPDATE_POST_DETAILS_ERROR:
      return {
        ...state,
        updatePostDetails: {
          error: true,
          errorData: action.payload,
          data: null,
          loading: false,
        },
      };
    case types.UPDATE_POST_DETAILS_RECEIVE:
      return {
        ...state,
        updatePostDetails: {
          error: false,
          errorData: null,
          data: action.payload,
          loading: false,
        },
      };

    //delete Post

    case types.DELETE_POST_REQUEST:
      return {
        ...state,
        deletePost: {
          error: false,
          errorData: null,
          data: null,
          loading: true,
        },
      };
    case types.DELETE_POST_ERROR:
      return {
        ...state,
        deletePost: {
          error: true,
          errorData: action.payload,
          data: null,
          loading: false,
        },
      };
    case types.DELETE_POST_RECEIVE:
      return {
        ...state,
        deletePost: {
          error: false,
          errorData: null,
          data: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
};
