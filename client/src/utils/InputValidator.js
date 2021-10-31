import validator from "validator";

/* *
 * Validates user input.
 * Supports email and password types.
 */
class Validator {
  constructor() {
    /** @const The validator instance */
    this.validator = validator;
  }

  /* *
   * @param {string} input The input to validate.
   * @param {string} error The error message.
   * @return {string } The error message.
   */
  isEmail(input, error = "Please enter a valid email") {
    if (!input) {
      return error;
    }

    if (!this.validator.isEmail(input)) {
      return error;
    }

    return "";
  }

  /* *
   * @param {string} input The input to validate.
   * @param {string} error The error message.
   * @param {number} minLength The minimum length of the password.
   * @return {string } The error message.
   */
  isPassword(input, error = "Please enter a strong password", minLength = 8) {
    if (!this.validator.isLength(input, { min: minLength })) {
      return `Must be longer than ${minLength} characters`;
    }

    if (!this.validator.isStrongPassword(input)) {
      return error;
    }

    return "";
  }

  /* *
   * @param {string} input1 The first input to validate.
   * @param {string} input2 The second input to validate.
   * @param {string} error The error message.
   * @return {string } The error message.
   */
  areEqual(input1, input2, error = "Inputs do not match") {
    if (!input1 || !input2) {
      return error;
    }
    if (input1 !== input2) {
      return error;
    }

    return "";
  }

  /* *
   * @param {string} input The input to validate.
   * @param {number} minLength The minimum length to validate.
   * @return {string} The error message.
   */
  isLength(input, minLength) {
    if (!this.validator.isLength(input, { min: minLength })) {
      return `Must be longer than ${minLength} characters`;
    }

    return "";
  }

  /* *
   * @param {array} fields The string values in array
   * @return {boolean} True if all strings are not empty
   */
  areAllNotEmpty(fields) {
    console.log("all not empty");
    console.log(fields.every((element) => element !== ""));
    return fields.every((element) => element !== "");
  }

  /* *
   * @param {array} fields The string values in array
   * @return {boolean} True if all strings are empty
   */
  areAllEmpty(fields) {
    console.log("all empty");
    console.log(fields.every((element) => element === ""));
    return fields.every((element) => element === "");
  }
}

export default new Validator();
