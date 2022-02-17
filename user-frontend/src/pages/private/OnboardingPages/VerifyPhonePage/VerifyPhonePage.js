import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DigitVerificationBox from "../../../../components/DigitVerificationBox/DigitVerificationBox";
import Spinner from "../../../../components/Spinner/Spinner";
import useInputValidate from "../../../../customHooks/useInputValidate";
import {
  resetVerificationCode,
  verificationCode,
} from "../../../../slices/user/verificationCodeSlice";
import {
  resetVerify,
  resetVerifyErrors,
  verify,
} from "../../../../slices/user/verifySlice";
import styles from "./VerifyPhonePage.module.css";

const initialState = {
  buttonDisabled: false,
};

export default function VerifyPhonePage(props) {
  const { phoneNumber } = useParams();

  const [boxOne, setBoxOne] = useState("");
  const [boxTwo, setBoxTwo] = useState("");
  const [boxThree, setBoxThree] = useState("");
  const [boxFour, setBoxFour] = useState("");
  const [boxFive, setBoxFive] = useState("");
  const [boxSix, setBoxSix] = useState("");

  const [counter, setCounter] = useState(30);
  const intervalRef = useRef(null);

  const [state, discharge] = useInputValidate(initialState);
  let { buttonDisabled } = state;

  useEffect(() => {
    discharge({
      type: "CHECK_ALL_FIELDS_VALID",
      payload: {
        notEmpty: [boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix],
      },
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
    error: errorVerificationCode,
  } = verificationCodeSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    if (counter < 0) {
      clearInterval(intervalRef.current);
      console.log("this ran");
      dispatch(resetVerificationCode());
    }
  }, [counter, dispatch]);

  const onCompleteHandler = () => {
    intervalRef.current = startTimer();
    const verificationCode =
      boxOne + boxTwo + boxThree + boxFour + boxFive + boxSix;
    dispatch(resetVerifyErrors());
    const decodedPhoneNumber = decodeURIComponent(phoneNumber);
    dispatch(
      verify({ type: "phone", payload: decodedPhoneNumber, verificationCode })
    );
  };

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setCounter((value) => value - 1);
    }, 1000);
    return intervalId;
  };

  const onResendCode = () => {
    dispatch(resetVerificationCode());
    setCounter(60);
    startTimer();
    const decodedPhoneNumber = decodeURIComponent(phoneNumber);
    dispatch(verificationCode({ type: "phone", payload: decodedPhoneNumber }));
  };

  useEffect(() => {
    if (verifyUser || user.phoneVerified) {
      props.history.push("/onboarding/aboutyou");
    }
  }, [verifyUser, props.history, user.phoneVerified]);

  useEffect(() => {
    return () => {
      dispatch(resetVerify());
    };
  }, [dispatch]);

  return (
    <>
      <div className="screen">
        <Link to="/onboarding/enter/phone" className="link link-back">
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Verify Mobile Number</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            Enter the confirmation code we to sent to your mobile number.
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
                [boxSix, setBoxSix],
              ]}
            ></DigitVerificationBox>
          </div>
        </main>
      </div>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        {loading ? <Spinner></Spinner> : "Verify"}
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
          "Resend code"
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
