import React from "react";
import { Link } from "react-router-dom";
import InputBox from "../../components/InputBox/InputBox";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
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
        <InputBox label="Email" placeholder="Ex. hello@gmail.com"></InputBox>
        <InputBox
          label="Password"
          type="password"
          belowInputText="Password must be at least 8 characters in length."
        ></InputBox>
      </main>
      <button className={`btn btn-primary ${styles.action_button}`}>
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
