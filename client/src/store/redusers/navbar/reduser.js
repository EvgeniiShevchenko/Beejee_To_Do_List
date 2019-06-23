import navbar_actions from "./actions";

const defaultState = {
    is_login_button_active: false,
    search_button_active: false,
    search_string: ""
}

const navReduser = (state = defaultState, action) => {
    switch (action.type) {
        case navbar_actions.SEARCH_ACTION:
            return {
                ...state, search_string: action.payload
            }

        case navbar_actions.SEARCH_BUTTON_PRESS:
            return {
                ...state, search_button_active: action.payload
            }

        case navbar_actions.BUTTON_LOGIN_ACTIVETED:
            return {
                ...state,
                is_login_button_active: !action.payload
            }

        default: 
            return state;
        }
};

export default navReduser;