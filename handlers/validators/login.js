const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.regNo = !isEmpty(data.regNo) ? data.regNo : "";

  data.password = !isEmpty(data.password) ? data.password : "";

  // Registration No. checks
  if (Validator.isEmpty(data.regNo)) {
    errors.regNo = "Registration No. is required";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};