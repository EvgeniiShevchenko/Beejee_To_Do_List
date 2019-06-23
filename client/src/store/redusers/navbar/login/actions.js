import jwt_decoded from 'jwt-decode';

const actionLogin = {
    CHANGE_LOGIN_EMAIL_FILD: "CHANGE_LOGIN_EMAIL_FILD",
    CHANGE_LOGIN_PASSWORD_FILD: "CHANGE_LOGIN_PASSWORD_FILD",
    BUTTON_LOGIN_SUBMIT_PRESS: "BUTTON_LOGIN_SUBMIT_PRESS",
    LOGIN_CURRENT_ADMIN: "LOGIN_CURRENT_ADMIN",
    LOGOUT_CURRENT_ADMIN: "LOGOUT_CURRENT_ADMIN",
};


export const login_button_submit_press = (state) => {
    return {
        type: "BUTTON_LOGIN_SUBMIT_PRESS",
        payload: state
    }
};

// Login...
export const loginUser = (userData) => dispatch => {
    fetch('/api/login/autorisation', {
        "method": "POST",
        "body": JSON.stringify(userData),
        "headers":{'Content-Type': 'application/json'}
    })
    .then(data => data.json())
    .then(res => {
      // Set token to local storage
      const {token}  = res;
      // decode token
      const decoded = jwt_decoded(token);
      // Save to localstorage
      localStorage.setItem('jwtToken', token);
      dispatch({
        type: "LOGIN_CURRENT_ADMIN",
        payload: decoded
      });
  
    })
    .catch(err => console.error(`Error: ${err}`))
}

//Log out...
export const logOutUser = () => dispatch => {
    //remove toke from localstorage
    localStorage.removeItem('jwtToken');
    //set auth state to false
    dispatch({
        type: "LOGOUT_CURRENT_ADMIN",
        payload: false
      });
};

export const change_login_email_filds = (value) => {
    return {
        type: "CHANGE_LOGIN_EMAIL_FILD",
        payload: value
    }
};

export const change_login_password_fild = (value) => {
    return {
        type: "CHANGE_LOGIN_PASSWORD_FILD",
        payload: value
    }
};


export default actionLogin;



