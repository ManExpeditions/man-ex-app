import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Validator from "../../../utils/InputValidator";
import styles from "./EnterPhonePage.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function EnterPhonePage(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputValidator = Validator;

  useEffect(() => {
    if (inputValidator.isPhoneNumber(phoneNumber).length <= 0) {
      console.log(phoneNumber);
      setButtonDisabled(false);
    } else {
      console.log(phoneNumber);
      setButtonDisabled(true);
    }
  }, [inputValidator, phoneNumber]);

  const onCompleteHandler = () => {
    props.history.push("/onboarding/verify/phone");
  };

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
        Verify
      </button>
    </>
  );
}
