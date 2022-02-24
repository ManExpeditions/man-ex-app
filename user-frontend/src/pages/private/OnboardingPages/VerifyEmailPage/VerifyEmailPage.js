import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DigitVerificationBox from '../../../../components/DigitVerificationBox/DigitVerificationBox';
import Spinner from '../../../../components/Spinner/Spinner';
import useInputValidate from '../../../../customHooks/useInputValidate';
import {
  resetVerificationCode,
  verificationCode
} from '../../../../slices/user/verificationCodeSlice';
import {
  resetVerify,
  resetVerifyErrors,
  verify
} from '../../../../slices/user/verifySlice';
import styles from './VerifyEmailPage.module.css';

const initialState = {
  buttonDisabled: false
};

export default function VerifyEmailPage(props) {
  const [boxOne, setBoxOne] = useState('');
  const [boxTwo, setBoxTwo] = useState('');
  const [boxThree, setBoxThree] = useState('');
  const [boxFour, setBoxFour] = useState('');
  const [boxFive, setBoxFive] = useState('');
  const [boxSix, setBoxSix] = useState('');

  const [counter, setCounter] = useState(30);
  const intervalRef = useRef(null);

  const [state, discharge] = useInputValidate(initialState);
  let { buttonDisabled } = state;

  useEffect(() => {
    discharge({
      type: 'CHECK_ALL_FIELDS_VALID',
      payload: {
        notEmpty: [boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix]
      }
    });
  }, [boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix, discharge]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const verifySlice = useSelector((state) => state.verifySlice);
  const { loading, user: verifyUser, error } = verifySlice;

  const verificationCodeSlice = useSelector(
    (state) => state.verificationCodeSlice
  );
  const {
    loading: loadingVerificationCode,
    success,
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
      dispatch(resetVerificationCode());
    }
  }, [counter, dispatch]);

  const onSubmitHandler = () => {
    intervalRef.current = startTimer();
    const verificationCode =
      boxOne + boxTwo + boxThree + boxFour + boxFive + boxSix;
    dispatch(resetVerifyErrors());
    dispatch(verify({ type: 'email', payload: user.email, verificationCode }));
  };

  const onResendCode = () => {
    dispatch(resetVerificationCode());
    setCounter(60);
    startTimer();
    dispatch(verificationCode({ type: 'email', payload: user.email }));
  };

  useEffect(() => {
    if (verifyUser || user.emailVerified) {
      props.history.push('/onboarding/enter/phone');
    }
  }, [user, verifyUser, props.history, error]);

  useEffect(() => {
    return () => {
      dispatch(resetVerify());
      // Set the duration of the counter in local storage
    };
  }, [dispatch]);

  return (
    <>
      <div className="screen">
        <h1 className={styles.page_title}>Enter Email Confirmation Code</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            Enter the confirmation code we to sent to your email.
          </p>
          <div className={styles.verification_wrapper}>
            <DigitVerificationBox
              error={error}
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
        </main>
      </div>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onSubmitHandler}
      >
        {loading ? <Spinner></Spinner> : 'Verify'}
      </button>
      <button
        disabled={counter > 0}
        className={`btn ${styles.resend_code_button}`}
        onClick={onResendCode}
      >
        {loadingVerificationCode ? (
          <Spinner></Spinner>
        ) : counter > 0 ? (
          `Resend code in ${counter} seconds`
        ) : (
          'Resend code'
        )}
      </button>
      {success ? (
        <span className={`success-message ${styles.verification_code_error}`}>
          {success.message}
        </span>
      ) : (
        <span className={`error-message ${styles.verification_code_error}`}>
          {errorVerificationCode}
        </span>
      )}
    </>
  );
}
