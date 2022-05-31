import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInputValidate from '../../../customHooks/useInputValidate';
import { InputPassword } from '../../../components/Input/Input';
import styles from './ResetPasswordPage.module.css';
import { IoChevronBackSharp } from 'react-icons/io5';
import Spinner from '../../../components/Spinner/Spinner';
import {
  resetUserResetPassword,
  userResetPassword
} from '../../../slices/user/userResetPasswordSlice';

const initialState = {
  password: '',
  passwordError: '',
  confirmPassword: '',
  confirmPasswordError: '',
  buttonDisabled: true
};

export default function ResetPasswordPage(props) {
  const { token } = useParams();

  const [state, discharge] = useInputValidate(initialState);

  let {
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    buttonDisabled
  } = state;

  // Focus the email input on first render
  const passwordRef = useRef(null);
  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const userResetPasswordSlice = useSelector(
    (state) => state.userResetPasswordSlice
  );
  const { loading, message, error } = userResetPasswordSlice;

  // On every render check if all fields are valid
  useEffect(() => {
    discharge({
      type: 'CHECK_ALL_FIELDS_VALID',
      payload: {
        empty: [passwordError, confirmPasswordError],
        notEmpty: [password, confirmPassword]
      }
    });
  }, [
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    discharge
  ]);

  const dispatch = useDispatch();
  const onPasswordResetHandler = () => {
    dispatch(userResetPassword({ token, password }));
  };

  useEffect(() => {
    if (message) {
      props.history.push('/signin');
    }
  }, [message, props.history]);

  useEffect(() => {
    return () => {
      dispatch(resetUserResetPassword());
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
      <h1 className={styles.page_title}>Reset Password</h1>
      <p className={styles.crossed_text}></p>
      <main>
        <div>
          <div className={styles.input_wrapper}>
            <div className={styles.label_wrapper}>
              <label className="label">Password</label>
              <span className="error-message">{passwordError}</span>
            </div>
            <InputPassword
              ref={passwordRef}
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
          {error && <span className="error-message">{error}</span>}
        </div>
      </main>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button} ${
          buttonDisabled && 'btn-primary-disabled'
        }`}
        onClick={onPasswordResetHandler}
      >
        {loading ? <Spinner></Spinner> : 'Reset Password'}
      </button>
    </div>
  );
}
