import validator from 'validator';
import isEmpty from './is-ampty';

const validate_task_post = data => {
  let errors = {}


  data.User = !isEmpty(data.User) ? data.User : '';
  data.Email = !isEmpty(data.Email) ? data.Email : '';
  data.Task = !isEmpty(data.Task) ? data.Task : '';


  if(validator.isEmpty(data.User)) {
    errors.User = "User can not be left blank";
  }
  if(validator.isEmpty(data.Email)) {
    errors.Email = "Email can not be left blank";
  }
  if(!validator.isEmail(data.Email)) {
    errors.Email = "Email is invalid";
}
  if(validator.isEmpty(data.Task)) {
    errors.Task = "Task is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};

export default validate_task_post;
