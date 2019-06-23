import {connect} from 'react-redux';
import {button_task_create, task_delete_from_list, task_displaed_to_scren, change_sort_type, button_task_pagination_pres, request_taskcount_from_database, pagination_task_request, change_status_completed, task_updated} from "../../../store/redusers/body/task/actions";
import Task from "./";
// import {defaultState} from "../../../store/redusers/body/task/reduser";

const PutPropsToState = (state) => {
    return {
        buttom_create_pres: state.taskReduser.buttom_create_pres,
        task: state.taskReduser.task,
        page_size: state.taskReduser.page_size,
        current_page: state.taskReduser.current_page,
        count_task: state.taskReduser.count_task,
        filter: state.taskReduser.filter,
        is_login: state.loginReduser.is_login
    }
};

const PutActionToProps = {
    button_task_create,
    task_updated,
    task_delete_from_list,
    task_displaed_to_scren,
    change_sort_type,
    pagination_task_request,
    button_task_pagination_pres,
    request_taskcount_from_database,
    change_status_completed
}

export default connect(PutPropsToState, PutActionToProps)(Task);