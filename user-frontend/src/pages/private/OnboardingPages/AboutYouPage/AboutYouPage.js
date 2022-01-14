import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../../../../components/InputBox/InputBox";
import styles from "./AboutYouPage.module.css";
import Validator from "../../../../utils/InputValidator";
import SelectBox from "../../../../components/SelectBox/SelectBox";
import {
  resetUserUpdate,
  userUpdate,
} from "../../../../slices/user/userUpdateSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import MessageBox from "../../../../components/MessageBox/MessageBox";

export default function AboutYouPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [language, setLanguage] = useState("English");

  const [firstNameValidationError, setFirstNameValidationError] = useState("");
  const [lastNameValidationError, setLastNameValidationError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputValidator = Validator;

  useEffect(() => {
    if (
      inputValidator.areAllNotEmpty([firstName, lastName]) &&
      inputValidator.areAllEmpty([
        firstNameValidationError,
        lastNameValidationError,
      ])
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    inputValidator,
    firstName,
    lastName,
    firstNameValidationError,
    lastNameValidationError,
  ]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const { loading, user: updatedUser, error } = userUpdateSlice;

  const dispatch = useDispatch();

  const onCompleteHandler = () => {
    dispatch(
      userUpdate({
        firstName,
        lastName,
        gender,
        language,
      })
    );
  };

  useEffect(() => {
    if (user.firstName) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setGender(user.gender);
      setLanguage(user.language);
    }

    if (updatedUser) {
      props.history.push("/onboarding/morequestions");
    }
  }, [user, updatedUser, props.history]);

  useEffect(() => {
    return () => {
      dispatch(resetUserUpdate());
    };
  }, [dispatch]);

  return (
    <div className="screen">
      <h1 className={styles.page_title}>About You</h1>
      <h3 className={styles.sub_title}>What's your name?</h3>
      <main>
        <InputBox
          autoFocus
          label="First Name"
          inputState={firstName}
          setInputState={setFirstName}
          inputValidationError={firstNameValidationError}
          setInputValidationError={setFirstNameValidationError}
          validationType="length"
        ></InputBox>
        <InputBox
          label="Last Name"
          inputState={lastName}
          setInputState={setLastName}
          inputValidationError={lastNameValidationError}
          setInputValidationError={setLastNameValidationError}
          validationType="length"
        ></InputBox>

        <h3 className={styles.sub_title}>What's your Gender?</h3>
        <p className="align-center">
          Man Ex woes all men plus family and friends regardless of gender
        </p>
        <br />
        <SelectBox
          label="Gender"
          type="text"
          options={["Male", "Female", "Non-binary", "Other"]}
          optionState={gender}
          setOptionState={setGender}
        ></SelectBox>
        <br />
        <SelectBox
          label="Language"
          type="text"
          options={["English", "Spanish", "Portuguese"]}
          optionState={language}
          setOptionState={setLanguage}
        ></SelectBox>
      </main>
      {error && <MessageBox variant="error">{error}</MessageBox>}
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        {loading ? <Spinner></Spinner> : "Verify"}
      </button>
    </div>
  );
}
