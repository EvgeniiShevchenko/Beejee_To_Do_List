import actionLogin from "./actions";
// import isEmpty from '../../../validations/is-ampty';

const isEmpty =  value => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0) ;

/*Set initial state */
export const defaultState = {
  is_login: !isEmpty(localStorage.getItem('jwtToken')),
  user: {},
  emailfild: "",
  passwordfild: ""
};

const loginReduser = (state = defaultState, action) => {
  switch(action.type) {

    case actionLogin.BUTTON_LOGIN_SUBMIT_PRESS:
        console.log(action.payload);
    return {
      ...state,
      is_login_button_pres: !action.payload
    }

    case actionLogin.LOGIN_CURRENT_ADMIN:
        console.log(action.payload);
    return {
      ...state,
      is_login: action.payload,
      user: action.payload
    }

    case actionLogin.LOGOUT_CURRENT_ADMIN:
        console.log(action.payload);
    return {
      ...state,
      is_login: false,
      user: {}
    }

    case actionLogin.CHANGE_LOGIN_EMAIL_FILD:
    return {
      ...state,
      emailfild: action.payload
    }

    case actionLogin.CHANGE_LOGIN_PASSWORD_FILD:
    return {
      ...state,
      passwordfild: action.payload
    }
    default: 
      return state;
  }
}

export default loginReduser;