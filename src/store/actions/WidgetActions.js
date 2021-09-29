import * as types from "../types/WidgetsTypes";


// GET widget
export const GetWidgetsListActionRequest = payload => {
    return {
        type: types.GET_WIDGETS_LIST_REQUEST,
        payload
    }
};

export const GetWidgetsListActionReceive = payload => {
    return {
        type: types.GET_WIDGETS_LIST_RECEIVE,
        payload
    };
}

export const GetWidgetsListActionError = payload => {
    return {
        type: types.GET_WIDGETS_LIST_ERROR,
        payload
    }
};

// CREATE Widgets 

export const CreateWidgetActionRequest = payload => {
    return {
        type: types.CREATE_WIDGET_REQUEST,
        payload
    }
};

export const CreateWidgetActionReceive = payload => {
    return {
        type: types.CREATE_WIDGET_RECEIVE,
        payload
    };
}

export const CreateWidgetActionError = payload => {
    return {
        type: types.CREATE_WIDGET_ERROR,
        payload
    }
};

//  GET Widget DETAILS

export const GetWidgetDetailsActionRequest = payload => {
    return {
        type: types.GET_WIDGET_DETAILS_REQUEST,
        payload
    }
};

export const GetWidgetDetailsActionReceive = payload => {
    return {
        type: types.GET_WIDGET_DETAILS_RECEIVE,
        payload
    };
}

export const GetWidgetDetailsActionError = payload => {
    return {
        type: types.GET_WIDGET_DETAILS_ERROR,
        payload
    }
};

// UPDATE Widget DETAILS

export const UpdateWidgetDetailsActionRequest = payload => {
    return {
        type: types.UPDATE_WIDGET_DETAILS_REQUEST,
        payload
    }
};

export const UpdateWidgetDetailsActionReceive = payload => {
    return {
        type: types.UPDATE_WIDGET_DETAILS_RECEIVE,
        payload
    };
}

export const UpdateWidgetDetailsActionError = payload => {
    return {
        type: types.UPDATE_WIDGET_DETAILS_ERROR,
        payload
    }
};

// DELETE SITE

export const DeleteWidgetActionRequest = payload => {
    return {
        type: types.DELETE_WIDGET_REQUEST,
        payload
    }
};

export const DeleteWidgetActionReceive = payload => {
    return {
        type: types.DELETE_WIDGET_RECEIVE,
        payload
    };
}

export const DeleteWidgetActionError = payload => {
    return {
        type: types.DELETE_WIDGET_ERROR,
        payload
    }
};