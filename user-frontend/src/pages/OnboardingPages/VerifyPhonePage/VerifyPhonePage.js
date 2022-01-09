import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DigitVerificationBox from "../../../components/DigitVerificationBox/DigitVerificationBox";
import Spinner from "../../../components/Spinner/Spinner";
import {
  resetVerify,
  resetVerifyErrors,
  verify,
} from "../../../slices/user/verifySlice";
import Validator from "../../../utils/InputValidator";
import styles from "./VerifyPhonePage.module.css";

export default function VerifyPhonePage(props) {
  const { phoneNumber } = useParams();

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

  const onCompleteHandler = () => {
    const verificationCode =
      boxOne + boxTwo + boxThree + boxFour + boxFive + boxSix;
    dispatch(resetVerifyErrors());
    const decodedPhoneNumber = decodeURIComponent(phoneNumber);
    dispatch(
      verify({ type: "phone", phone: decodedPhoneNumber, verificationCode })
    );
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
    </>
  );
}
