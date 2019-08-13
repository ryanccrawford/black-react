const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "We need to call you something. Enter a Name";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Please enter a valid email";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "The Email you entered is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "You must comfirm your password";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Your password needs to be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Your passwords did not match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};