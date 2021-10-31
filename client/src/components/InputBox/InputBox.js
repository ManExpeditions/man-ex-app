import { useState } from "react";
import styles from "./InputBox.module.css";

export default function InputBox({
  label,
  placeholder,
  belowInputText,
  labelHidden,
  inputState,
  setInputState,
  inputValidationError,
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
          className={`input ${inputValidationError && "input-error"}`}
          id={label}
          type={inputType}
          name={label}
          placeholder={placeholder}
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
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
