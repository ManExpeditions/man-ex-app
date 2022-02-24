import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AboutYouPage.module.css';
import SelectBox from '../../../../components/SelectBox/SelectBox';
import {
  resetUserUpdate,
  userUpdate
} from '../../../../slices/user/userUpdateSlice';
import Spinner from '../../../../components/Spinner/Spinner';
import MessageBox from '../../../../components/MessageBox/MessageBox';
import Input from '../../../../components/Input/Input';
import useInputValidate from '../../../../customHooks/useInputValidate';

const initialState = {
  firstName: '',
  lastName: '',
  firstNameError: '',
  lastNameError: '',
  buttonDisabled: true
};

export default function AboutYouPage(props) {
  const [gender, setGender] = useState('Male');
  const [language, setLanguage] = useState('English');

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const [state, discharge] = useInputValidate(initialState);
  let { firstName, firstNameError, lastName, lastNameError, buttonDisabled } =
    state;

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
        language
      })
    );
  };

  useEffect(() => {
    if (user.firstName) {
      discharge({
        type: 'SET_AND_VALIDATE_FIRSTNAME',
        payload: { value: user.firstName }
      });
    }
    if (user.lastName) {
      discharge({
        type: 'SET_AND_VAlIDATE_LASTNAME',
        payload: { value: user.lastName }
      });
    }
    if (user.gender) {
      setGender(user.gender);
    }
    if (user.language) {
      setLanguage(user.language);
    }
    if (updatedUser) {
      props.history.push('/onboarding/morequestions');
    }
  }, [
    discharge,
    props.history,
    updatedUser,
    user.firstName,
    user.lastName,
    user.gender,
    user.language
  ]);

  useEffect(() => {
    discharge({
      type: 'CHECK_ALL_FIELDS_VALID',
      payload: {
        empty: [firstNameError, lastNameError],
        notEmpty: [firstName, lastName]
      }
    });
  }, [firstName, lastName, firstNameError, lastNameError, discharge]);

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
        <div className="input-wrapper">
          <div className="label-wrapper">
            <label className="label">First Name</label>
            <span className="error-message">{firstNameError}</span>
          </div>
          <Input
            className={`input ${firstNameError && 'input-error'}`}
            ref={focusRef}
            value={firstName}
            dispatch={discharge}
            actionType="SET_AND_VALIDATE_FIRSTNAME"
            payload={{ min: 2, max: 30 }}
          />
        </div>
        <div className="input-wrapper">
          <div className="label-wrapper">
            <label className="label">Last Name</label>
            <span className="error-message">{lastNameError}</span>
          </div>
          <Input
            className={`input ${lastNameError && 'input-error'}`}
            value={lastName}
            dispatch={discharge}
            actionType="SET_AND_VAlIDATE_LASTNAME"
            payload={{ min: 3, max: 30 }}
          />
        </div>
        <h3 className={styles.sub_title}>What's your Gender?</h3>
        <p className="align-center">
          Man Ex woes all men plus family and friends regardless of gender
        </p>
        <br />
        <SelectBox
          label="Gender"
          type="text"
          options={['Male', 'Female', 'Non-binary', 'Other']}
          optionState={gender}
          setOptionState={setGender}
        ></SelectBox>
        <br />
        <SelectBox
          label="Language"
          type="text"
          options={['English', 'Spanish', 'Portuguese']}
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
        {loading ? <Spinner></Spinner> : 'Verify'}
      </button>
    </div>
  );
}
