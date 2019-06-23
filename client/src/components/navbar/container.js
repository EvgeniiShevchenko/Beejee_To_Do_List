import {connect} from "react-redux";
import NavBar from "./";
import {searchaction, login_button_press} from "../../store/redusers/navbar/actions";
import {search_request_from_header} from "../../store/redusers/body/task/actions";
import {logOutUser} from "../../store/redusers/navbar/login/actions";



const PutStateToProps = (state) => {
    return {
        searchstring: state.navReduser.search_string,
        is_login_button_active: state.navReduser.is_login_button_active,
        is_login: state.loginReduser.is_login
    }
};

const PutActionToProps = {
    searchaction,
    login_button_press,
    logOutUser,
    search_request_from_header
};

export default connect(PutStateToProps, PutActionToProps)(NavBar);
