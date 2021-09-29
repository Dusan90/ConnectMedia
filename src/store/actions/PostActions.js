import * as types from "../types/PostsTypes";


// GET posts
export const GetPostsListActionRequest = payload => {
    return {
        type: types.GET_POSTS_LIST_REQUEST,
        payload
    }
};

export const GetPostsListActionReceive = payload => {
    return {
        type: types.GET_POSTS_LIST_RECEIVE,
        payload
    };
}

export const GetPostsListActionError = payload => {
    return {
        type: types.GET_POSTS_LIST_ERROR,
        payload
    }
};

// CREATE post 

export const CreatePostActionRequest = payload => {
    return {
        type: types.CREATE_POST_REQUEST,
        payload
    }
};

export const CreatePostActionReceive = payload => {
    return {
        type: types.CREATE_POST_RECEIVE,
        payload
    };
}

export const CreatePostActionError = payload => {
    return {
        type: types.CREATE_POST_ERROR,
        payload
    }
};

//  GET post DETAILS

export const GetPostDetailsActionRequest = payload => {
    return {
        type: types.GET_POST_DETAILS_REQUEST,
        payload
    }
};

export const GetPostDetailsActionReceive = payload => {
    return {
        type: types.GET_POST_DETAILS_RECEIVE,
        payload
    };
}

export const GetPostDetailsActionError = payload => {
    return {
        type: types.GET_POST_DETAILS_ERROR,
        payload
    }
};

// UPDATE post DETAILS

export const UpdatePostDetailsActionRequest = payload => {
    return {
        type: types.UPDATE_POST_DETAILS_REQUEST,
        payload
    }
};

export const UpdatePostDetailsActionReceive = payload => {
    return {
        type: types.UPDATE_POST_DETAILS_RECEIVE,
        payload
    };
}

export const UpdatePostDetailsActionError = payload => {
    return {
        type: types.UPDATE_POST_DETAILS_ERROR,
        payload
    }
};

// DELETE post

export const DeletePostActionRequest = payload => {
    return {
        type: types.DELETE_POST_REQUEST,
        payload
    }
};

export const DeletePostActionReceive = payload => {
    return {
        type: types.DELETE_POST_RECEIVE,
        payload
    };
}

export const DeletePostActionError = payload => {
    return {
        type: types.DELETE_POST_ERROR,
        payload
    }
};