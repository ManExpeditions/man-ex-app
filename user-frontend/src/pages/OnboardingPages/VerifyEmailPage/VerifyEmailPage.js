import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DigitVerificationBox from "../../../components/DigitVerificationBox/DigitVerificationBox";
import Spinner from "../../../components/Spinner/Spinner";
import { resetVerifyErrors, verify } from "../../../slices/user/verifySlice";
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

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const verifySlice = useSelector((state) => state.verifySlice);
  const { loading, user: verifyUser, error } = verifySlice;

  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    const verificationCode =
      boxOne + boxTwo + boxThree + boxFour + boxFive + boxSix;
    dispatch(resetVerifyErrors());
    dispatch(verify({ type: "email", verificationCode }));
  };

  useEffect(() => {
    if (verifyUser || user.emailVerified) {
      props.history.push("/onboarding/enter/phone");
    }
  }, [user, verifyUser, props.history, error]);

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
                [boxSix, setBoxSix],
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
        {loading ? <Spinner></Spinner> : "Verify"}
      </button>
    </>
  );
}
