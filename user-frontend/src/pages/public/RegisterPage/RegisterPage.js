import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Input from '../../../components/Input/Input';
import useInputValidate from '../../../customHooks/useInputValidate';
import { InputPassword } from '../../../components/Input/Input';
import {
  emailRegisterUser,
  resetEmailRegister,
  resetEmailRegisterErrors
} from '../../../slices/auth/emailRegisterSlice';

const initialState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  confirmPassword: '',
  confirmPasswordError: '',
  buttonDisabled: false
};

export default function RegisterPage(props) {
  const [state, discharge] = useInputValidate(initialState);
  let {
    email,
    emailError,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    buttonDisabled
  } = state;

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
        empty: [emailError, passwordError, confirmPasswordError],
        notEmpty: [email, password, confirmPassword]
      }
    });
  }, [
    email,
    emailError,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    discharge
  ]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const emailRegisterSlice = useSelector((state) => state.emailRegisterSlice);
  const { createdUser, error } = emailRegisterSlice;

  const dispatch = useDispatch();
  const onCreateAccountHandler = () => {
    dispatch(emailRegisterUser({ email, password }));
  };

  useEffect(() => {
    // Prevent logged in user from seeing this page
    if (user) {
      props.history.push('/onboarding/verify/email');
    }
    return () => {
      dispatch(resetEmailRegisterErrors());
    };
  }, [user, dispatch, createdUser, props.history]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetEmailRegister());
    };
  }, [dispatch]);

  return (
    <div className="screen">
      <Link to="/home">
        <img
          className={styles.logo}
          src="/logo192.png"
          alt="Man Expeditions Logo"
        />
      </Link>
      <h1 className={styles.page_title}>Create Account</h1>
      <p className={styles.crossed_text}>
      </p>
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
            <span className="error-message">{passwordError}</span>
          </div>
          <InputPassword
            type="password"
            className={`input ${passwordError && 'input-error'}`}
            value={password}
            dispatch={discharge}
            actionType="SET_AND_VALIDATE_PASSWORD"
          />
        </div>
        <div className={styles.input_wrapper}>
          <div className={styles.label_wrapper}>
            <label className="label">Confirm Password</label>
            <span className="error-message">{confirmPasswordError}</span>
          </div>
          <InputPassword
            type="password"
            className={`input ${confirmPasswordError && 'input-error'}`}
            value={confirmPassword}
            dispatch={discharge}
            actionType="SET_AND_VALIDATE_CONFIRM_PASSWORD"
          />
        </div>
      </main>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button} ${
          buttonDisabled && 'btn-primary-disabled'
        }`}
        onClick={onCreateAccountHandler}
      >
        Create Account
      </button>
      <p className={styles.existing_account}>
        Already have an account?{' '}
        <Link to="/signin" className={`link ${styles.navigation_link}`}>
          SIGN IN
        </Link>
      </p>
    </div>
  );
}
