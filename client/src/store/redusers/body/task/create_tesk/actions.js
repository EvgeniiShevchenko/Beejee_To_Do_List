const actioncreatetask = {
    CHANGE_CREATE_TASK_NAME_FILD: "CHANGE_CREATE_TASK_NAME_FILD",
    CHANGE_CREATE_TASK_EMAIL_FILD: "CHANGE_CREATE_TASK_EMAIL_FILD",
    CHANGE_CREATE_TASK_CONTENT_FILD: "CHANGE_CREATE_TASK_CONTENT_FILD"
};


export const change_create_task_name_fild = (value) => {
    return {
        type: "CHANGE_CREATE_TASK_NAME_FILD",
        payload: value
    }
};

export const change_create_task_email_fild = (value) => {
    return {
        type: "CHANGE_CREATE_TASK_EMAIL_FILD",
        payload: value
    }
};

export const change_create_task_content_fild = (value) => {
    return {
        type: "CHANGE_CREATE_TASK_CONTENT_FILD",
        payload: value
    }
};

export default actioncreatetask;