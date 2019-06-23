import {connect} from "react-redux";
import {change_login_email_filds, change_login_password_fild, login_button_submit_press, loginUser} from "../../../store/redusers/navbar/login/actions";
import {login_button_press} from "../../../store/redusers/navbar/actions";
import Login from "./";
// import {defaultState} from "../../../store/redusers/navbar/login/reduser";

const PutStateToProps = (state) => {
    return {
        emailfild: state.loginReduser.emailfild,
        passwordfild: state.loginReduser.passwordfild,
        user: state.loginReduser.user,
        is_login_button_active: state.navReduser.is_login_button_active
    }
};

const PutActionsToProps = {
    change_login_email_filds,
    change_login_password_fild,
    login_button_submit_press,
    loginUser,
    login_button_press
};

export default connect(PutStateToProps, PutActionsToProps)(Login);

