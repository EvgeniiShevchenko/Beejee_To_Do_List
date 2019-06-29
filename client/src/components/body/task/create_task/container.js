import Newtask from "./";
import {connect} from "react-redux";
import {post_new_task, button_task_create} from "../../../../store/redusers/body/task/actions"; // add new post from task
import {task_validation, task_is_valid, task_is_invalid, clear_task_form, change_create_task_name_fild, change_create_task_email_fild, change_create_task_content_fild} from "../../../../store/redusers/body/task/create_tesk/actions";
// import {defaultState} from "../../../../store/redusers/body/task/create_tesk/reduser";

const PutStateToProps = (state) => {
    return {
        name: state.taskcreatorReduser.name,
        email: state.taskcreatorReduser.email,
        task: state.taskcreatorReduser.task,
        error: state.taskcreatorReduser.error,
        buttom_create_pres: state.taskReduser.buttom_create_pres
    }
};

const PutActionToProps = {
    change_create_task_name_fild,
    change_create_task_email_fild,
    change_create_task_content_fild,
    clear_task_form,
    task_validation,
    task_is_valid,
    task_is_invalid,
    button_task_create,
    post_new_task
};

export default connect(PutStateToProps, PutActionToProps)(Newtask);