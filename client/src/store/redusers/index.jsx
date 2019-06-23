import {combineReducers} from "redux";
import navReduser from "./navbar/reduser";
import loginReduser from "./navbar/login/reduser";
import taskReduser from "./body/task/reduser";
import taskcreatorReduser from "./body/task/create_tesk/reduser"

const rootReduser = combineReducers({
    navReduser: navReduser,
    loginReduser: loginReduser,
    taskReduser: taskReduser,
    taskcreatorReduser: taskcreatorReduser
});

export default rootReduser;