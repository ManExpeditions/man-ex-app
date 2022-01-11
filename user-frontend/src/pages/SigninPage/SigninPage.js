import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputBox from "../../components/InputBox/InputBox";
import styles from "./SigninPage.module.css";
import Validator from "../../utils/InputValidator";
import { useDispatch, useSelector } from "react-redux";
import { resetSigninErrors, signin } from "../../slices/auth/signinSlice";
import MessageBox from "../../components/MessageBox/MessageBox";

export default function SigninPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValidationError, setEmailValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputValidator = Validator;

  useEffect(() => {
    if (
      inputValidator.areAllNotEmpty([email, password]) &&
      inputValidator.areAllEmpty([
        emailValidationError,
        passwordValidationError,
      ])
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    email,
    emailValidationError,
    inputValidator,
    password,
    passwordValidationError,
  ]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user, error } = signinSlice;

  const dispatch = useDispatch();
  const onSigninHandler = () => {
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    if (user) {
      props.history.push("/home");
    }
    return () => {
      dispatch(resetSigninErrors());
    };
  }, [dispatch, user, props.history]);

  return (
    <div className="screen">
      <Link to="/home">
        <img
          className={styles.logo}
          src="/logo192.png"
          alt="Man Expeditions Logo"
        />
      </Link>
      <h1 className={styles.page_title}>Sign In</h1>
      <button className={styles.facebook_button}>
        <i class={`fab fa-facebook fa-lg ${styles.facebook_icon}`}></i>
        Sign in with Facebook
      </button>
      <p className={styles.crossed_text}>
        <span>or</span>
      </p>
      <main>
        {error && <MessageBox variant="error">{error}</MessageBox>}
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
        ></InputBox>
      </main>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button} ${
          buttonDisabled && "btn-primary-disabled"
        }`}
        onClick={onSigninHandler}
      >
        Sign in
      </button>
      <p className={styles.existing_account}>
        Don't have an account?{" "}
        <Link to="/register" className={`link ${styles.navigation_link}`}>
          SIGN UP
        </Link>
      </p>
    </div>
  );
}
