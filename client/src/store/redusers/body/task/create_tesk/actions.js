import is_ampty from "../../../../validations/is-ampty";
import task_post from "../../../../validations/task-post";


const actioncreatetask = {
    TASK_VALIDATION: "TASK_VALIDATION",
    TASK_IS_VALID: "TASK_IS_VALID",
    TASK_IS_INVALID: "TASK_IS_INVALID",
    CLEAR_TASK_FORM: "CLEAR_TASK_FORM",
    CHANGE_CREATE_TASK_NAME_FILD: "CHANGE_CREATE_TASK_NAME_FILD",
    CHANGE_CREATE_TASK_EMAIL_FILD: "CHANGE_CREATE_TASK_EMAIL_FILD",
    CHANGE_CREATE_TASK_CONTENT_FILD: "CHANGE_CREATE_TASK_CONTENT_FILD"
};


export const task_validation = (data) => {
    const result = task_post(data);
    console.log("TCL: task_validation -> result", result);
    return {
        type: "TASK_VALIDATION",
        payload: result
    }
};

export const task_is_valid = () => {
    return {
        type: "TASK_IS_VALID",
        payload: {
            errors: {},
            isValid: true
        }
    }
};

export const task_is_invalid = () => {
    return {
        type: "TASK_IS_INVALID",
        payload: {
            errors: {},
            isValid: false
        }
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
                task: ""
            }
        }
    }else{
        // Вызов действия посредством нажатия на форму ввода данных в условия ошибки
        const name = event.target.name;
        if(valid_task === false){
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