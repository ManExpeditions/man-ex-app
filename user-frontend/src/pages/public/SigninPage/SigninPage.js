import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './SigninPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetSigninErrors, signin } from '../../../slices/auth/signinSlice';
import MessageBox from '../../../components/MessageBox/MessageBox';
import useInputValidate from '../../../customHooks/useInputValidate';
import Input, { InputPassword } from '../../../components/Input/Input';

const initialState = {
  email: '',
  emailError: '',
  password: '',
  buttonDisabled: false
};

export default function SigninPage(props) {
  const [state, discharge] = useInputValidate(initialState);
  let { email, emailError, password, buttonDisabled } = state;

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
        notEmpty: [email, password]
      }
    });
  }, [email, emailError, password, discharge]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user, error } = signinSlice;

  const dispatch = useDispatch();
  const onSigninHandler = () => {
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    if (user) {
      props.history.push('/home');
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
      <p className={styles.crossed_text}></p>
      <main>
        {error && <MessageBox variant="error">{error}</MessageBox>}
        <div className={styles.input_wrapper}>
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
        <div className={styles.input_wrapper}>
          <div className={styles.label_wrapper}>
            <label className="label">Password</label>
          </div>
          <InputPassword
            type="password"
            className="input"
            value={password}
            dispatch={discharge}
            actionType="SET_AND_VALIDATE_PASSWORD"
          />
        </div>
      </main>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button} ${
          buttonDisabled && 'btn-primary-disabled'
        }`}
        onClick={onSigninHandler}
      >
        Sign in
      </button>
      <p className={styles.existing_account}>
        Don't have an account?{' '}
        <Link to="/register" className={`link ${styles.navigation_link}`}>
          SIGN UP
        </Link>
        <br />
        <Link to="/forgotpassword" className={`link link-blue`}>
          Forgot password?
        </Link>
      </p>
    </div>
  );
}
