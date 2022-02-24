import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DigitVerificationBox from '../../../../components/DigitVerificationBox/DigitVerificationBox';
import Input, { InputPassword } from '../../../../components/Input/Input';
import MessageBox from '../../../../components/MessageBox/MessageBox';
import Spinner from '../../../../components/Spinner/Spinner';
import useInputValidate from '../../../../customHooks/useInputValidate';
import {
  resetUserValidate,
  validateUser
} from '../../../../slices/user/userValidateSlice';
import {
  resetVerificationCode,
  resetVerificationCodeErrors,
  verificationCode
} from '../../../../slices/user/verificationCodeSlice';
import {
  resetVerify,
  resetVerifyErrors,
  verify
} from '../../../../slices/user/verifySlice';
import styles from './UpdateEmailPage.module.css';

const initialState = {
  password: '',
  email: '',
  emailError: '',
  buttonDisabled: true
};

export default function UpdateEmailPage(props) {
  const [boxOne, setBoxOne] = useState('');
  const [boxTwo, setBoxTwo] = useState('');
  const [boxThree, setBoxThree] = useState('');
  const [boxFour, setBoxFour] = useState('');
  const [boxFive, setBoxFive] = useState('');
  const [boxSix, setBoxSix] = useState('');

  const [counter, setCounter] = useState(30);
  const [state, discharge] = useInputValidate(initialState);

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const intervalRef = useRef(null);

  let { password, email, emailError } = state;

  const userValidateSlice = useSelector((state) => state.userValidateSlice);
  const {
    loading: loadingValidatedUser,
    success: validatedUser,
    error: errorValidatedUser
  } = userValidateSlice;

  const verifySlice = useSelector((state) => state.verifySlice);
  const {
    loading: loadingVerifyUser,
    user: verifyUser,
    error: errorVerifyUser
  } = verifySlice;

  const verificationCodeSlice = useSelector(
    (state) => state.verificationCodeSlice
  );
  const {
    loading: loadingVerificationCode,
    success: verificationCodeSuccess,
    error: errorVerificationCode
  } = verificationCodeSlice;

  const dispatch = useDispatch();

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setCounter((value) => value - 1);
    }, 1000);
    return intervalId;
  };

  useEffect(() => {
    if (counter < 0) {
      clearInterval(intervalRef.current);
      setCounter(30);
    }
  }, [counter, dispatch]);

  // Focus ref on email
  useEffect(() => {
    if (validatedUser) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  }, [validatedUser]);

  // Validate user password
  const onValidatePassword = () => {
    dispatch(validateUser(password));
  };

  const onSendCode = () => {
    intervalRef.current = startTimer();
    setCounter(30);
    dispatch(resetVerificationCodeErrors());
    dispatch(verificationCode({ type: 'email', payload: email }));
  };

  // Verify the code the user provided
  const onVerifyCode = () => {
    const verificationCode =
      boxOne + boxTwo + boxThree + boxFour + boxFive + boxSix;
    dispatch(resetVerifyErrors());
    dispatch(verify({ type: 'email', payload: email, verificationCode }));
  };

  // If everything was succesfull then
  useEffect(() => {
    if (verifyUser) {
      window.setTimeout(() => {
        props.history.push('/profile/settings');
      }, 2000);
    }
  }, [dispatch, props.history, verifyUser]);

  useEffect(() => {
    // Cleanup on exit of page
    return () => {
      dispatch(resetUserValidate());
      dispatch(resetVerificationCode());
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
        <h1>Update Email</h1>

        {verifyUser ? (
          <MessageBox>
            Email updated. Redirecting...
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
                <label className="label">New Email</label>
                <div className={styles.email_error_container}>
                  {emailError && (
                    <span className="error-message">{emailError}</span>
                  )}
                  {verificationCodeSuccess && (
                    <span className="success-message">
                      Code sent succesfully.
                    </span>
                  )}
                  {errorVerificationCode && (
                    <span className="error-message">
                      {errorVerificationCode}
                    </span>
                  )}
                </div>
              </div>
              <Input
                className={`input ${emailError && 'input-error'}`}
                ref={emailRef}
                value={email}
                dispatch={discharge}
                actionType="SET_AND_VALIDATE_EMAIL"
              />
            </div>
            <button
              disabled={
                emailError === '' && email && counter === 30 ? false : true
              }
              className={`btn ${styles.action_button}`}
              onClick={onSendCode}
            >
              {loadingVerificationCode ? <Spinner></Spinner> : 'Send Code'}
            </button>
            <p className={styles.resend_text}>Resend in {counter} seconds</p>
            {verificationCodeSuccess !== null && (
              <div className={styles.verification_wrapper}>
                <p className={`align-center ${styles.info}`}>
                  Enter the confirmation code we to sent to your email.
                </p>
                <br />
                <div className={styles.digits_wrapper}>
                  <DigitVerificationBox
                    isAutoFocus={
                      verificationCodeSuccess !== null ? true : false
                    }
                    error={errorVerifyUser}
                    boxes={[
                      [boxOne, setBoxOne],
                      [boxTwo, setBoxTwo],
                      [boxThree, setBoxThree],
                      [boxFour, setBoxFour],
                      [boxFive, setBoxFive],
                      [boxSix, setBoxSix]
                    ]}
                  ></DigitVerificationBox>
                </div>
                <button
                  disabled={
                    verificationCodeSuccess &&
                    (boxOne + boxTwo + boxThree + boxFour + boxFive + boxSix)
                      .length === 6
                      ? false
                      : true
                  }
                  className={`btn margin-auto ${styles.action_button} ${styles.verification_button}`}
                  onClick={onVerifyCode}
                >
                  {loadingVerifyUser ? <Spinner></Spinner> : 'Verify code'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
