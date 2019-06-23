const navbar_actions = {
    SEARCH_ACTION: "SEARCH_ACTION",
    SEARCH_BUTTON_PRESS: "SEARCH_BUTTON_PRESS",
    BUTTON_LOGIN_ACTIVETED: "BUTTON_LOGIN_ACTIVETED",
};


export const searchaction = (action) => {
    return {
        type: "SEARCH_ACTION",
        payload: action
    }
};

export const search_button_press = () => {
    return {
        type: "SEARCH_BUTTON_PRESS",
        payload: true
    }
};


export const login_button_press = (state) => {
    return {
        type: "BUTTON_LOGIN_ACTIVETED",
        payload: state
    }
};


export default navbar_actions;