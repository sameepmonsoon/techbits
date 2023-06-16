const validateUserInputForm = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "User name is required";
  } else {
    let userRegEx = /^[a-zA-Z0-9]{4,10}$/;
    if (!userRegEx.test(values.username)) {
      errors.username = "Invalid Username";
    }
  }

  if (!values.email) {
    errors.email = "Email is required";
    // setIsSubmitting(false);
  } else {
    let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,5}$/i;
    if (!emailRegEx.test(values.email)) {
      errors.email = "Email is not valid";
      // setIsSubmitting(false);
    }
  }
  if (!values.phone) {
    errors.phone = "Phone number is required";
    // setIsSubmitting(false);
  } else {
    let phoneRegEx = /[9][6-9]\d{8}/;

    if (!phoneRegEx.test(values.phone)) {
      errors.phone = "Phone number is not valid";
      // setIsSubmitting(false);
    }
  }
  if (!values.password) {
    errors.password = "Password is required.";
    // setIsSubmitting(false);
  } else {
    let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!passwordRegEx.test(values.password)) {
      // setIsSubmitting(false);

      errors.password =
        "Password must contain atleast 6 characters, one uppercase, one lowercase, one special-character and one number ";
    }
  }

  return errors;
};

export { validateUserInputForm };
