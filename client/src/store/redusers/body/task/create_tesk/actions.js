import is_ampty from "../../../../validations/is-ampty";

const actioncreatetask = {
    TASK_INVALID: "TASK_INVALID",
    CLEAR_TASK_FORM: "CLEAR_TASK_FORM",
    SWITCH_OFF_TASK_VALID: "SWITCH_OFF_TASK_VALID",
    VALIDATION_TASK_POST: "VALIDATION_TASK_POST",
    CHANGE_CREATE_TASK_NAME_FILD: "CHANGE_CREATE_TASK_NAME_FILD",
    CHANGE_CREATE_TASK_EMAIL_FILD: "CHANGE_CREATE_TASK_EMAIL_FILD",
    CHANGE_CREATE_TASK_CONTENT_FILD: "CHANGE_CREATE_TASK_CONTENT_FILD"
};


export const validation_task_post = (validate) => {
    return {
        type: "VALIDATION_TASK_POST",
        payload: validate
    }
};

export const switch_off_task_valid = () => {
    return {
        type: "SWITCH_OFF_TASK_VALID",
        payload: false
    }
};

export const task_invalid = () => {
    return {
        type: "TASK_INVALID",
        payload: true
    }
};

export const clear_task_form = (valid_task, event) => {
    // Вызов дествия посредством кнопки
    if(is_ampty(event.target.name)){
        return {
            type: "CLEAR_TASK_FORM",
            payload: {
                name: "",
                email: "",
                task: "",
                error: false
            }
        }
    }else{
        // Вызов действия посредством нажатия на форму ввода данных в условия ошибки
        const name = event.target.name;
        if(valid_task === true){
            return {
                type: "CLEAR_TASK_FORM",
                payload: {
                    [name]: ""
                }
            }
        }else{
            // Вызов действия посредством нажатия на форму ввода данных
            return {
                type: "CLEAR_TASK_FORM",
                    payload: {
                        [name]: event.target.value
                    }
            }
        }
    }
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