import * as types from "../types/CategoryTypes";


// GET CATEGORY
export const GetCategoryListActionRequest = payload => {
    return {
        type: types.GET_CATEGORY_LIST_REQUEST,
        payload
    }
};

export const GetCategoryListActionReceive = payload => {
    return {
        type: types.GET_CATEGORY_LIST_RECEIVE,
        payload
    };
}

export const GetCategoryListActionError = payload => {
    return {
        type: types.GET_CATEGORY_LIST_ERROR,
        payload
    }
};

// CREATE CATEGORY 

export const CreateCategoryActionRequest = payload => {
    return {
        type: types.CREATE_CATEGORY_REQUEST,
        payload
    }
};

export const CreateCategoryActionReceive = payload => {
    return {
        type: types.CREATE_CATEGORY_RECEIVE,
        payload
    };
}

export const CreateCategoryActionError = payload => {
    return {
        type: types.CREATE_CATEGORY_ERROR,
        payload
    }
};

//  GET CATEGORY DETAILS

export const GetCategoryDetailsActionRequest = payload => {
    return {
        type: types.GET_CATEGORY_DETAILS_REQUEST,
        payload
    }
};

export const GetCategoryDetailsActionReceive = payload => {
    return {
        type: types.GET_CATEGORY_DETAILS_RECEIVE,
        payload
    };
}

export const GetCategoryDetailsActionError = payload => {
    return {
        type: types.GET_CATEGORY_DETAILS_ERROR,
        payload
    }
};

// UPDATE CATEGORY DETAILS

export const UpdateCategoryDetailsActionRequest = payload => {
    return {
        type: types.UPDATE_CATEGORY_DETAILS_REQUEST,
        payload
    }
};

export const UpdateCategoryDetailsActionReceive = payload => {
    return {
        type: types.UPDATE_CATEGORY_DETAILS_RECEIVE,
        payload
    };
}

export const UpdateCategoryDetailsActionError = payload => {
    return {
        type: types.UPDATE_CATEGORY_DETAILS_ERROR,
        payload
    }
};

// DELETE CATEGORY

export const DeleteCategoryActionRequest = payload => {
    return {
        type: types.DELETE_CATEGORY_REQUEST,
        payload
    }
};

export const DeleteCategoryActionReceive = payload => {
    return {
        type: types.DELETE_CATEGORY_RECEIVE,
        payload
    };
}

export const DeleteCategoryActionError = payload => {
    return {
        type: types.DELETE_CATEGORY_ERROR,
        payload
    }
};