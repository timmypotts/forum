export default function validateAuth(values) {
  let errors = {};

  //Email errors
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //Password Errors
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (values.password !== values.passwordConfirm) {
    errors.password = "Passwords do not match";
  }

  //Username Errors
  if (!values.username) {
    errors.username = "Username is Required";
  }
  return errors;
}
