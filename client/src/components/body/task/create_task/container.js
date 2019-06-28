import Newtask from "./";
import {connect} from "react-redux";
import {post_new_task, button_task_create} from "../../../../store/redusers/body/task/actions"; // add new post from task
import {validation_task_post, switch_off_task_valid, task_invalid, clear_task_form, change_create_task_name_fild, change_create_task_email_fild, change_create_task_content_fild} from "../../../../store/redusers/body/task/create_tesk/actions";
// import {defaultState} from "../../../../store/redusers/body/task/create_tesk/reduser";

const PutStateToProps = (state) => {
    return {
        name: state.taskcreatorReduser.name,
        error: state.taskcreatorReduser.error,
        email: state.taskcreatorReduser.email,
        task: state.taskcreatorReduser.task,
        valid_task: state.taskcreatorReduser.valid_task,
        buttom_create_pres: state.taskReduser.buttom_create_pres
    }
};

const PutActionToProps = {
    clear_task_form,
    validation_task_post,
    switch_off_task_valid,
    change_create_task_name_fild,
    change_create_task_email_fild,
    change_create_task_content_fild,
    post_new_task,
    task_invalid,
    button_task_create
};

export default connect(PutStateToProps, PutActionToProps)(Newtask);