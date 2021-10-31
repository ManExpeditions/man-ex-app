import React, { useState } from "react";
import InputBox from "../../components/InputBox/InputBox";
import styles from "./AboutYouPage.module.css";
import Validator from "../../utils/InputValidator";
import SelectBox from "../../components/SelectBox/SelectBox";
import useDidMountEffect from "../../customHooks/useDidMountEffect";

export default function AboutYouPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");

  const [firstNameValidationError, setFirstNameValidationError] = useState("");
  const [lastNameValidationError, setLastNameValidationError] = useState("");
  const [genderValidationError, setGenderValidationError] = useState("");

  const inputValidator = Validator;

  useDidMountEffect(() => {
    setFirstNameValidationError(inputValidator.isLength(firstName, 3));
  }, [firstName, inputValidator]);

  useDidMountEffect(() => {
    setLastNameValidationError(inputValidator.isLength(lastName, 3));
  }, [lastName, inputValidator]);

  useDidMountEffect(() => {
    setGenderValidationError(inputValidator.isLength(gender, 3));
  }, [gender, inputValidator]);

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
        ></InputBox>
        <InputBox
          label="Last Name"
          inputState={lastName}
          setInputState={setLastName}
          inputValidationError={lastNameValidationError}
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
