import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import useInputValidate from '../../../customHooks/useInputValidate';
import Input from '../../../components/Input/Input';
import styles from './ForgotPasswordPage.module.css';
import { IoChevronBackSharp } from 'react-icons/io5';
import {
  resetUserForgotPassword,
  userForgotPassword
} from '../../../slices/user/userForgotPasswordSlice';
import Spinner from '../../../components/Spinner/Spinner';

const initialState = {
  email: '',
  emailError: '',
  buttonDisabled: false
};

export default function ForgotPasswordPage(props) {
  const [state, discharge] = useInputValidate(initialState);
  let { email, emailError, buttonDisabled } = state;

  // Focus the email input on first render
  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, []);

  // On every render check if all fields are valid
  useEffect(() => {
    discharge({
      type: 'CHECK_ALL_FIELDS_VALID',
      payload: {
        empty: [emailError],
        notEmpty: [email]
      }
    });
  }, [email, emailError, discharge]);

  const userForgotPasswordSlice = useSelector(
    (state) => state.userForgotPasswordSlice
  );
  const { message, loading, error } = userForgotPasswordSlice;

  const dispatch = useDispatch();

  const onForgotPassword = () => {
    dispatch(userForgotPassword(email));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUserForgotPassword());
    };
  }, [dispatch]);

  return (
    <div className="screen">
      <div className={styles.top_links}>
        <Link className={`link ${styles.back_link}`} to="/profile/settings">
          <IoChevronBackSharp size={25}></IoChevronBackSharp>
          Back
        </Link>
      </div>
      <Link to="/home">
        <img
          className={styles.logo}
          src="/logo192.png"
          alt="Man Expeditions Logo"
        />
      </Link>
      <h1 className={styles.page_title}>Forgot Password</h1>
      <p className={styles.crossed_text}></p>
      <main>
        <div className={styles.input_wrapper}>
          <p className={styles.input_info}>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
          <div className={styles.label_wrapper}>
            <label className="label">Email</label>
            <span className="error-message">{emailError}</span>
          </div>
          <Input
            className={`input ${emailError && 'input-error'}`}
            ref={focusRef}
            value={email}
            dispatch={discharge}
            actionType="SET_AND_VALIDATE_EMAIL"
          />
        </div>
        {error && <MessageBox variant="error">{error}</MessageBox>}
        {message && (
          <MessageBox variant="success">{message.message}</MessageBox>
        )}
      </main>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button} ${
          buttonDisabled && 'btn-primary-disabled'
        }`}
        onClick={onForgotPassword}
      >
        {loading ? <Spinner></Spinner> : 'Continue'}
      </button>
    </div>
  );
}
