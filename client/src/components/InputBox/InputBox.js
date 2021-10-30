import { useState } from "react";
import styles from "./InputBox.module.css";

export default function InputBox({
  label,
  placeholder,
  type = "text",
  belowInputText,
  labelHidden,
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
      <label
        className={`${styles.label} ${labelHidden && "hidden"}`}
        htmlFor={label}
      >
        {label}
      </label>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          id={label}
          type={inputType}
          name={label}
          placeholder={placeholder}
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
      <p className={styles.below_text}>{belowInputText}</p>
    </div>
  );
}
