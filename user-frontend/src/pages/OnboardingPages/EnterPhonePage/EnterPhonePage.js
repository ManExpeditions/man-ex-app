import "react-phone-number-input/style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import {
  resetVerificationCode,
  verificationCode,
} from "../../../slices/user/verificationCodeSlice";
import Validator from "../../../utils/InputValidator";
import styles from "./EnterPhonePage.module.css";
import Spinner from "../../../components/Spinner/Spinner";
import MessageBox from "../../../components/MessageBox/MessageBox";

export default function EnterPhonePage(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputValidator = Validator;

  useEffect(() => {
    if (inputValidator.isPhoneNumber(phoneNumber).length <= 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [inputValidator, phoneNumber]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const verificationCodeSlice = useSelector(
    (state) => state.verificationCodeSlice
  );
  const { loading, success, error } = verificationCodeSlice;

  const dispatch = useDispatch();

  const onCompleteHandler = () => {
    dispatch(verificationCode({ type: "phone", phone: phoneNumber }));
  };

  useEffect(() => {
    if (user.phoneVerified) {
      props.history.push("/onboarding/aboutyou");
    }

    if (success) {
      props.history.push(
        `/onboarding/verify/phone/${encodeURIComponent(phoneNumber)}`
      );
    }
  }, [user, success, props.history, error, phoneNumber]);

  useEffect(() => {
    return () => {
      dispatch(resetVerificationCode());
    };
  }, [dispatch]);

  return (
    <>
      <div className="screen">
        <Link to="/onboarding/verify/email" className="link link-back">
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Enter Mobile Number</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            To help us serve you better, we need your mobile number.
          </p>
          <div className={styles.input_wrapper}>
            {error && <MessageBox variant="error">{error}</MessageBox>}
            <PhoneInput
              autoFocus
              international
              defaultCountry="US"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
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
    </>
  );
}
