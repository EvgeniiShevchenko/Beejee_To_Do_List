import taskcreator from "./actions";

export const defaultState = {
    valid_task: false,
    error: false,
    name: "",
    email: "",
    task: ""
};

const taskcreatorReduser = (state = defaultState, action) => {
    switch(action.type){
        case taskcreator.VALIDATION_TASK_POST:
            console.log(action.payload);
            return {
                ...state,
                valid_task: action.payload
            }

        case taskcreator.TASK_INVALID:
            return {
                ...state,
                error: action.payload
            }

        case taskcreator.CLEAR_TASK_FORM:
            console.log(action.payload); 
            return {
                ...state,
                ...action.payload
            }

        case taskcreator.SWITCH_OFF_TASK_VALID:
            return {
                ...state,
                valid_task: action.payload
            }

        case taskcreator.CHANGE_CREATE_TASK_NAME_FILD: 
            return {
                ...state,
                name: action.payload
            }

        case taskcreator.CHANGE_CREATE_TASK_EMAIL_FILD: 
            return {
                ...state,
                email: action.payload
            }

        case taskcreator.CHANGE_CREATE_TASK_CONTENT_FILD: 
            return {
                ...state,
                task: action.payload
            }
        default: 
             return state;
    }
};

export default taskcreatorReduser;