import { useEffect, useState } from "react";
import DigitVerificationBox from "../../../components/DigitVerificationBox/DigitVerificationBox";
import Validator from "../../../utils/InputValidator";
import styles from "./VerifyEmailPage.module.css";

export default function VerifyEmailPage(props) {
  const [boxOne, setBoxOne] = useState("");
  const [boxTwo, setBoxTwo] = useState("");
  const [boxThree, setBoxThree] = useState("");
  const [boxFour, setBoxFour] = useState("");
  const [boxFive, setBoxFive] = useState("");
  const [boxSix, setBoxSix] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputValidator = Validator;

  useEffect(() => {
    if (
      inputValidator.areAllNotEmpty([
        boxOne,
        boxTwo,
        boxThree,
        boxFour,
        boxFive,
        boxSix,
      ])
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [boxSix, boxFive, boxFour, boxOne, boxThree, boxTwo, inputValidator]);

  const onCompleteHandler = () => {
    props.history.push("/onboarding/enter/phone");
  };

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
        Verify
      </button>
    </>
  );
}
