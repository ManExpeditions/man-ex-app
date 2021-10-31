import React, { useState } from "react";
import InputBox from "../../components/InputBox/InputBox";
import styles from "./AboutYouPage.module.css";
import Validator from "../../utils/InputValidator";
import SelectBox from "../../components/SelectBox/SelectBox";

export default function AboutYouPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");

  const [firstNameValidationError, setFirstNameValidationError] = useState("");
  const [lastNameValidationError, setLastNameValidationError] = useState("");
  const [genderValidationError, setGenderValidationError] = useState("");

  const inputValidator = Validator;
  const onCompleteHandler = () => {
    if (
      inputValidator.areAllNotEmpty([firstName, lastName, gender]) &&
      inputValidator.areAllEmpty([
        firstNameValidationError,
        lastNameValidationError,
        genderValidationError,
      ])
    ) {
      // TODO: Add logic to store info in DB
      props.history.push("/onboarding/2");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.page_title}>About You</h1>
      <h3 className={styles.sub_title}>What's your name?</h3>
      <main>
        <InputBox
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
        <InputBox
          label="Gender"
          type="text"
          inputState={gender}
          setInputState={setGender}
          inputValidationError={genderValidationError}
          setInputValidationError={setGenderValidationError}
          validationType="length"
        ></InputBox>
        <SelectBox
          label="Language"
          type="text"
          options={["English", "Spanish", "Portuguese"]}
          optionState={language}
          setOptionState={setLanguage}
          inputValidationError={genderValidationError}
        ></SelectBox>
      </main>
      <button
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Continue
      </button>
    </div>
  );
}
