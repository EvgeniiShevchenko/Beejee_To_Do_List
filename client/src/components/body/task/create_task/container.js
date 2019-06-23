import Newtask from "./";
import {connect} from "react-redux";
import {post_new_task, button_task_create} from "../../../../store/redusers/body/task/actions"; // add new post from task
import {change_create_task_name_fild, change_create_task_email_fild, change_create_task_content_fild} from "../../../../store/redusers/body/task/create_tesk/actions";
// import {defaultState} from "../../../../store/redusers/body/task/create_tesk/reduser";

const PutStateToProps = (state) => {
    return {
        name: state.taskcreatorReduser.name,
        email: state.taskcreatorReduser.email,
        task: state.taskcreatorReduser.task,
        buttom_create_pres: state.taskReduser.buttom_create_pres
    }
};

const PutActionToProps = {
    change_create_task_name_fild,
    change_create_task_email_fild,
    change_create_task_content_fild,
    post_new_task,
    button_task_create
};

export default connect(PutStateToProps, PutActionToProps)(Newtask);