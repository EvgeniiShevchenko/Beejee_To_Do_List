import taskpost from "./actions";

export const defaultState = {
    buttom_create_pres: true,
    current_page: 1,
    count_task: 0,
    page_size: 3,
    filter: "_id",
    task: []
};


const taskReduser = (state = defaultState, action) => {
    switch(action.type) {

        case taskpost.SEARCH_REQUEST_FROM_HEADER:
            return {
                ...state,
                task: action.payload,
                page_size: 50
            }

        case taskpost.BUTTON_TASK_CREATE_PRES:
            return {
                ...state,
                buttom_create_pres: !action.payload
            }

        case taskpost.TASK_DISPLAED_TO_SCREN:
            return {...state,
                task: action.payload
            }

        case taskpost.TASK_DELETE_FROM_LIST:
            const task_delete = state.task.filter(task => task._id !== action.payload);
            return {...state,
                task: task_delete
            }

        case taskpost.POST_NEW_TASK:
            return {
                ...state, task: [action.payload, ...state.task] 
            }

            case taskpost.CHANGE_SORT_TYPE:
            return {...state,
                filter: action.payload,
                current_page: 1
            }

            case taskpost.CHANGE_STATUS_COMPLETED:
            const newstate = state.task.map((task) => {
                if(task._id === action.payload.id){
                    return {
                        ...task, Status: action.payload.status
                    }
                }
                return task
            });

            return {
                ...state,
                    task: newstate
            }

            case taskpost.TASK_UPDATED:
            const newstask = state.task.map((task) => {
                if(task._id === action.payload.id){
                    return {
                        ...task, ...action.payload.task
                    }
                }
                return task
            });

            return {
                ...state,
                    task: newstask
            }

            case taskpost.BUTTON_TASK_PAGINATION_PRES:
            return {...state,
                current_page: action.payload
            }

            case taskpost.PAGINATION_TASK_REQUEST:
            return {...state,
                task: action.payload
            }
        
        default:
            return state
    }
};

export default taskReduser;