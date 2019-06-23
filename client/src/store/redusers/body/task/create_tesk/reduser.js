import taskcreator from "./actions";

export const defaultState = {
    name: "",
    email: "",
    task: ""
};

const taskcreatorReduser = (state = defaultState, action) => {
    switch(action.type){
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