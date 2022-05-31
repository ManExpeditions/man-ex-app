import { useReducer } from 'react';
import validator from 'validator';

export default function useInputValidate(initialState) {
  const [state, dispatch] = useReducer((state, action) => {
    const value = action.payload.value;
    const min = action.payload.min ? action.payload.min : 3;
    const max = action.payload.max ? action.payload.max : 200;
    const threshold = action.payload.threshold ? action.payload.threshold : 3;
    const thresholdContinents = action.payload.thresholdContinents
      ? action.payload.thresholdContinents
      : 2;
    switch (action.type) {
      case 'SET_AND_VALIDATE_EMAIL':
        if (validator.isEmail(action.payload.value) || !value) {
          return {
            ...state,
            email: value,
            emailError: ''
          };
        } else {
          return {
            ...state,
            email: value,
            emailError: 'Please enter a valid email.'
          };
        }
      case 'SET_AND_VALIDATE_FIRSTNAME':
        if (
          (validator.isLength(value, { min, max }) &&
            validator.isAlpha(value)) ||
          !value
        ) {
          return {
            ...state,
            firstName: value,
            firstNameError: ''
          };
        } else if (!validator.isLength(value, { min })) {
          return {
            ...state,
            firstName: value,
            firstNameError: `Name must be longer than ${min} letters.`
          };
        } else if (!validator.isLength(value, { max })) {
          return {
            ...state,
            firstName: value,
            firstNameError: `Name must be less than ${max} letters.`
          };
        } else if (value.includes(' ')) {
          return {
            ...state,
            firstName: value,
            firstNameError: 'Name cannot have spaces.'
          };
        } else {
          return {
            ...state,
            firstName: value,
            firstNameError: 'Please enter a valid name.'
          };
        }
      case 'SET_AND_VAlIDATE_LASTNAME':
        if (
          (validator.isLength(value, { min, max }) &&
            validator.isAlpha(value)) ||
          !value
        ) {
          return {
            ...state,
            lastName: value,
            lastNameError: ''
          };
        } else if (!validator.isLength(value, { min })) {
          return {
            ...state,
            lastName: value,
            lastNameError: `Name must be longer than ${min} letters.`
          };
        } else if (!validator.isLength(value, { max })) {
          return {
            ...state,
            lastName: value,
            lastNameError: `Name must be less than ${max} letters.`
          };
        } else if (value.includes(' ')) {
          return {
            ...state,
            lastName: value,
            lastNameError: 'Name cannot have spaces.'
          };
        } else {
          return {
            ...state,
            lastName: value,
            lastNameError: 'Please enter a valid name.'
          };
        }
      case 'SET_AND_VALIDATE_PASSWORD':
        if (validator.isStrongPassword(value, { minSymbols: 0 }) || !value) {
          return {
            ...state,
            password: value,
            passwordError: ''
          };
        } else if (value.length < 8) {
          return {
            ...state,
            password: value,
            passwordError: 'Password must be atleast 8 characters.'
          };
        } else if (value === value.toUpperCase()) {
          return {
            ...state,
            password: value,
            passwordError: 'Must have atleast one lower case letter.'
          };
        } else if (value === value.toLowerCase()) {
          return {
            ...state,
            password: value,
            passwordError: 'Password must have alteast one upper case letter.'
          };
        } else if (!/\d/.test(value)) {
          return {
            ...state,
            password: value,
            passwordError: 'Password must have atleast one digit'
          };
        } else {
          return {
            ...state,
            password: value,
            passwordError: 'Please enter a valid password.'
          };
        }
      case 'SET_AND_VALIDATE_CONFIRM_PASSWORD':
        if (state.password === value || !value) {
          return {
            ...state,
            confirmPassword: value,
            confirmPasswordError: ''
          };
        } else {
          return {
            ...state,
            confirmPassword: value,
            confirmPasswordError: 'Passwords do not match.'
          };
        }
      case 'SET_AND_VALIDATE_BIO':
        if (validator.isLength(value, { min, max }) || !value) {
          return {
            ...state,
            bio: value,
            bioError: ''
          };
        } else {
          return {
            ...state,
            bio: value,
            bioError: `Must be ${min}-${max} characters.`
          };
        }
      case 'SET_AND_VALIDATE_INSTAGRAM':
        if (validator.isLength(value, { min, max }) || !value) {
          return {
            ...state,
            instagram: value,
            instagramError: ''
          };
        } else {
          return {
            ...state,
            instagram: value,
            instagramError: 'Not valid handle.'
          };
        }
      case 'SET_AND_VALIDATE_FACEBOOK':
        if (validator.isLength(value, { min, max }) || !value) {
          return {
            ...state,
            facebook: value,
            facebookError: ''
          };
        } else {
          return {
            ...state,
            facebook: value,
            facebookError: 'Not valid handle.'
          };
        }
      case 'SET_AND_VALIDATE_LINKEDIN':
        if (validator.isLength(value, { min, max }) || !value) {
          return {
            ...state,
            linkedin: value,
            linkedinError: ''
          };
        } else {
          return {
            ...state,
            linkedin: value,
            linkedinError: 'Not valid handle.'
          };
        }
      case 'CHECK_ALL_FIELDS_VALID':
        const allEmpty = action.payload.empty
          ? action.payload.empty.every((item) => item === '')
          : true;
        const allNotEmpty = action.payload.notEmpty
          ? action.payload.notEmpty.every((item) => item !== '')
          : true;
        if (allEmpty && allNotEmpty) {
          return { ...state, buttonDisabled: false };
        } else {
          return { ...state, buttonDisabled: true };
        }
      case 'VALIDATE_INTERESTS':
        if (
          value instanceof Array &&
          value.filter(Boolean).length >= threshold
        ) {
          return { ...state, interestErrors: '' };
        } else {
          return {
            ...state,
            interestErrors: `Select atleast ${threshold}.`
          };
        }
      case 'VALIDATE_CONTINENTS':
        if (
          value instanceof Array &&
          value.filter(Boolean).length >= thresholdContinents
        ) {
          return { ...state, continentErrors: '' };
        } else {
          return {
            ...state,
            continentErrors: `Select atleast ${thresholdContinents}.`
          };
        }

      default:
        return state;
    }
  }, initialState);
  return [state, dispatch];
}
