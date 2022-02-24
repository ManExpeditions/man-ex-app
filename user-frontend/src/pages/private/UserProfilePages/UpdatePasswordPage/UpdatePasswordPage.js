import React, { useEffect, useRef } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { InputPassword } from '../../../../components/Input/Input';
import MessageBox from '../../../../components/MessageBox/MessageBox';
import Spinner from '../../../../components/Spinner/Spinner';
import useInputValidate from '../../../../customHooks/useInputValidate';
import {
  resetUserValidate,
  validateUser
} from '../../../../slices/user/userValidateSlice';
import styles from './UpdatePasswordPage.module.css';
import {
  resetUserUpdate,
  userUpdate
} from '../../../../slices/user/userUpdateSlice';
import { resetVerify } from '../../../../slices/user/verifySlice';

const initialState = {
  password: '',
  passwordError: '',
  confirmPassword: '',
  confirmPasswordError: '',
  buttonDisabled: true
};

export default function UpdatePasswordPage(props) {
  const [state, discharge] = useInputValidate(initialState);

  const passwordRef = useRef(null);

  let {
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    buttonDisabled
  } = state;

  const userValidateSlice = useSelector((state) => state.userValidateSlice);
  const {
    loading: loadingValidatedUser,
    success: validatedUser,
    error: errorValidatedUser
  } = userValidateSlice;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const {
    loading: loadingUpdatedUser,
    user: updatedUser,
    error: errorUpdatedUser
  } = userUpdateSlice;

  const dispatch = useDispatch();

  // Focus ref on phone
  useEffect(() => {
    if (!validatedUser) {
      passwordRef.current.focus();
    }
  }, [validatedUser]);

  // Validate user password
  const onValidatePassword = () => {
    dispatch(validateUser(password));
  };

  const onPasswordUpdateHandler = () => {
    dispatch(userUpdate({ password }));
  };

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

  // If everything was succesfull then
  useEffect(() => {
    if (updatedUser) {
      window.setTimeout(() => {
        props.history.push('/profile/settings');
      }, 2000);
    }
  }, [dispatch, props.history, updatedUser]);

  useEffect(() => {
    // Cleanup on exit of page
    return () => {
      dispatch(resetUserValidate());
      dispatch(resetUserUpdate());
      dispatch(resetVerify());
    };
  }, [dispatch]);

  return (
    <div className={`bg-white ${styles.page_wrapper}`}>
      <div className={styles.top_links}>
        <Link className={`link ${styles.back_link}`} to="/profile/settings">
          <IoChevronBackSharp size={25}></IoChevronBackSharp>
          Back
        </Link>
      </div>
      <div className={styles.container}>
        <h1>Change Password</h1>

        {updatedUser ? (
          <MessageBox>
            Password updated. Redirecting...
            <div className={styles.spinner_wrapper}>
              <Spinner></Spinner>{' '}
            </div>{' '}
          </MessageBox>
        ) : !validatedUser ? (
          <>
            <div className={styles.input_wrapper}>
              <br />
              <div className={styles.label_wrapper}>
                <label className="label">
                  First, we need to make sure that it is you who is requesting
                  this change.
                </label>
              </div>
              <InputPassword
                type="password"
                ref={passwordRef}
                className="input"
                placeholder="Current password"
                value={password}
                dispatch={discharge}
                actionType="SET_AND_VALIDATE_PASSWORD"
              />
              <span className="error-message">{errorValidatedUser}</span>
            </div>
            <button
              disabled={password === '' ? true : false}
              className={`btn ${styles.action_button}`}
              onClick={onValidatePassword}
            >
              {loadingValidatedUser ? <Spinner></Spinner> : 'Validate Password'}
            </button>
          </>
        ) : (
          <>
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
            {errorUpdatedUser && (
              <span className="error-message">{errorUpdatedUser}</span>
            )}
            <button
              disabled={buttonDisabled}
              className={`btn ${styles.action_button}`}
              onClick={onPasswordUpdateHandler}
            >
              {loadingUpdatedUser ? <Spinner></Spinner> : 'Update Password'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
