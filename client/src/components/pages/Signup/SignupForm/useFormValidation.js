import React, { useContext } from "react";
import { UserContext } from "../../../../services/auth-service";

function useFormValidation(initialState, validate, AuthService) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [submissionError, setSubmissionError] = React.useState(null);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        AuthService.register(values.username, values.email, values.password)
          .then((response) => {
            console.log(response);
            console.log(
              "authenticated!",
              values.username,
              values.email,
              values.password
            );
            setUser(values.username);
            setSubmitting(false);
          })
          .catch((err) => {
            console.log(err);
            setSubmissionError(
              "A user with that username or email already exists."
            );
            setSubmitting(false);
          });

        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  // function handleBlur() {
  //   const validationErrors = validate(values);
  //   setErrors(validationErrors);
  // }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    // handleBlur,
    values,
    errors,
    isSubmitting,
    submissionError,
  };
}

export default useFormValidation;
