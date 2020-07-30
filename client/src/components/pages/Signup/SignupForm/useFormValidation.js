import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../utils/UserContext";

function useFormValidation(initialState, validate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        axios
          .post(`http://localhost:8080/register`, {
            username: values.username,
            email: values.email,
            password: values.password,
          })
          .then((response) => {
            console.log(response);
            console.log(
              "authenticated!",
              values.username,
              values.email,
              values.password
            );
            setUser(values.username);
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
    user,
    setUser,
  };
}

export default useFormValidation;
