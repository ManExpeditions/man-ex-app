import React, { useEffect, useState } from "react";
import InputBox from "../../../components/InputBox/InputBox";
import styles from "./AboutYouPage.module.css";
import Validator from "../../../utils/InputValidator";
import SelectBox from "../../../components/SelectBox/SelectBox";

export default function AboutYouPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");

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

  const onCompleteHandler = () => {
    // TODO: Add logic to store info in DB
    props.history.push("/onboarding/morequestions");
  };

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
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Continue
      </button>
    </div>
  );
}
