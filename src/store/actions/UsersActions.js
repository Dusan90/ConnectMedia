import * as types from "../types/UsersTypes";

// GET USERS LIST   

export const GetUsersListActionRequest = payload => {
    return {
        type: types.GET_USERS_LIST_REQUEST,
        payload
    }
};

export const GetUsersListActionReceive = payload => {
    return {
        type: types.GET_USERS_LIST_RECEIVE,
        payload
    };
}

export const GetUsersListActionError = payload => {
    return {
        type: types.GET_USERS_LIST_ERROR,
        payload
    }
};


// GET SELF
export const GetSelfUserActionRequest = payload => {
    return {
        type: types.GET_SELF_USER_REQUEST,
        payload
    }
};

export const GetSelfUserActionReceive = payload => {
    return {
        type: types.GET_SELF_USER_RECEIVE,
        payload
    };
}

export const GetSelfUserActionError = payload => {
    return {
        type: types.GET_SELF_USER_ERROR,
        payload
    }
};

// CREATE USER

export const CreateUserActionRequest = payload => {
    return {
        type: types.CREATE_USER_REQUEST,
        payload
    }
};

export const CreateUserActionReceive = payload => {
    return {
        type: types.CREATE_USER_RECEIVE,
        payload
    };
}

export const CreateUserActionError = payload => {
    return {
        type: types.CREATE_USER_ERROR,
        payload
    }
};

// CHANGE SELF USER PASSWORD

export const ChangeSelfUserPassActionRequest = payload => {
    return {
        type: types.CHANGE_SELF_USER_PASS_REQUEST,
        payload
    }
};

export const ChangeSelfUserPassActionReceive = payload => {
    return {
        type: types.CHANGE_SELF_USER_PASS_RECEIVE,
        payload
    };
}

export const ChangeSelfUserPassActionError = payload => {
    return {
        type: types.CHANGE_SELF_USER_PASS_ERROR,
        payload
    }
};

// GET DETAILS OF SPEC USER

export const GetSpecUserDetailsActionRequest = payload => {
    return {
        type: types.GET_SPEC_USER_DETAILS_REQUEST,
        payload
    }
};

export const GetSpecUserDetailsActionReceive = payload => {
    return {
        type: types.GET_SPEC_USER_DETAILS_RECEIVE,
        payload
    };
}

export const GetSpecUserDetailsActionError = payload => {
    return {
        type: types.GET_SPEC_USER_DETAILS_ERROR,
        payload
    }
};


// UPDATE SPEC USER

export const UpdateSpecUsersActionRequest = payload => {
    return {
        type: types.UPDATE_SPEC_USER_REQUEST,
        payload
    }
};

export const UpdateSpecUsersActionReceive = payload => {
    return {
        type: types.UPDATE_SPEC_USER_RECEIVE,
        payload
    };
}

export const UpdateSpecUsersActionError = payload => {
    return {
        type: types.UPDATE_SPEC_USER_ERROR,
        payload
    }
};


// DELETE SPEC USER

export const DeleteSpecUsersActionRequest = payload => {
    return {
        type: types.DELETE_SPEC_USER_REQUEST,
        payload
    }
};

export const DeleteSpecUsersActionReceive = payload => {
    return {
        type: types.DELETE_SPEC_USER_RECEIVE,
        payload
    };
}

export const DeleteSpecUsersActionError = payload => {
    return {
        type: types.DELETE_SPEC_USER_ERROR,
        payload
    }
};