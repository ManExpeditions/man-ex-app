import { useState } from "react";
import Validator from "../../utils/InputValidator";
import styles from "./InputBox.module.css";

export default function InputBox({
  label,
  placeholder,
  belowInputText,
  inputState,
  setInputState,
  inputValidationError,
  setInputValidationError,
  validationType,
  isLocation,
  autoFocus,
  type = "text",
}) {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const inputValidator = Validator;

  const validateInput = (input) => {
    setInputState(input);
    switch (validationType) {
      case "email":
        setInputValidationError(inputValidator.isEmail(input));
        break;
      case "password":
        setInputValidationError(inputValidator.isPassword(input));
        break;
      case "length":
        setInputValidationError(inputValidator.isLength(input, 3));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={styles.label_wrapper}>
        <label className="label" htmlFor={label}>
          {label}
        </label>
        <span className="error-message">{inputValidationError}</span>
      </div>
      <div className={styles.input_wrapper}>
        <input
          autoFocus={autoFocus || null}
          style={{ paddingLeft: isLocation && "2.2rem" }}
          className={`input ${inputValidationError && "input-error"}`}
          id={label}
          type={inputType}
          name={label}
          placeholder={placeholder}
          value={inputState}
          onChange={(e) => validateInput(e.target.value)}
        ></input>
        {/* If type is password show eye to enable toggling password visibility */}
        {type === "password" && (
          <button
            className={styles.eye_button}
            onClick={togglePasswordVisibility}
          >
            <i class={`fa fa-eye ${styles.eye}`} aria-hidden="true"></i>
          </button>
        )}
      </div>
      <p className="below-text">{belowInputText}</p>
    </div>
  );
}
