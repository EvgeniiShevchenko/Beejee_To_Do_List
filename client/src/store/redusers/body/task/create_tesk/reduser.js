import taskcreator from "./actions";

export const defaultState = {
    error: {errors: {}, isValid: false},
    name: "",
    email: "",
    task: ""
};

const taskcreatorReduser = (state = defaultState, action) => {
    switch(action.type){

        case taskcreator.TASK_VALIDATION:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload
            }

        case taskcreator.TASK_IS_VALID:
            return {
                ...state,
                error: {...state.error, ...action.payload}
            }

        case taskcreator.TASK_IS_INVALID:
            return {
                ...state,
                error: {...state.error, ...action.payload}
            }

        case taskcreator.CLEAR_TASK_FORM:
            console.log(action.payload); 
            return {
                ...state,
                ...action.payload
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