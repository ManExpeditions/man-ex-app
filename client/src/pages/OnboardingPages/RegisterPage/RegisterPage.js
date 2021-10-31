import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputBox from "../../../components/InputBox/InputBox";
import styles from "./RegisterPage.module.css";
import Validator from "../../../utils/InputValidator";
import useDidMountEffect from "../../../customHooks/useDidMountEffect";

export default function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailValidationError, setEmailValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputValidator = Validator;

  useDidMountEffect(() => {
    setPasswordMatchError(
      inputValidator.areEqual(
        password,
        confirmPassword,
        "Passwords do not match"
      )
    );
  }, [confirmPassword, inputValidator]);

  useEffect(() => {
    if (
      inputValidator.areAllNotEmpty([email, password, confirmPassword]) &&
      inputValidator.areAllEmpty([
        emailValidationError,
        passwordValidationError,
        passwordMatchError,
      ])
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    confirmPassword,
    email,
    emailValidationError,
    inputValidator,
    password,
    passwordMatchError,
    passwordValidationError,
  ]);

  const onCreateAccountHandler = () => {
    // TODO: Create user account logic.
    props.history.push("/onboarding/1");
  };

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.logo}
        src="/logo192.png"
        alt="Man Expeditions Logo"
      />
      <h1 className={styles.page_title}>Create Account</h1>
      <button className={styles.facebook_button}>
        <i class={`fab fa-facebook fa-lg ${styles.facebook_icon}`}></i>
        Sign in with Facebook
      </button>
      <p className={styles.crossed_text}>
        <span>or</span>
      </p>
      <main>
        <InputBox
          label="Email"
          placeholder="Ex. hello@gmail.com"
          inputState={email}
          setInputState={setEmail}
          inputValidationError={emailValidationError}
          setInputValidationError={setEmailValidationError}
          validationType="email"
        ></InputBox>
        <InputBox
          label="Password"
          type="password"
          inputState={password}
          setInputState={setPassword}
          inputValidationError={passwordValidationError}
          setInputValidationError={setPasswordValidationError}
          validationType="password"
        ></InputBox>
        <InputBox
          label="Confirm Password"
          type="password"
          inputState={confirmPassword}
          setInputState={setConfirmPassword}
          inputValidationError={passwordMatchError}
        ></InputBox>
      </main>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button} ${
          buttonDisabled && "btn-primary-disabled"
        }`}
        onClick={onCreateAccountHandler}
      >
        Create Account
      </button>
      <p className={styles.existing_account}>
        Already have an account?{" "}
        <Link to="/signin" className={`link ${styles.navigation_link}`}>
          SIGN IN
        </Link>
      </p>
    </div>
  );
}
