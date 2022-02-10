import { useReducer } from "react";
import validator from "validator";

export default function useInputValidate(initialState) {
  const [state, dispatch] = useReducer((state, action) => {
    const value = action.payload.value;
    switch (action.type) {
      case "SET_AND_VALIDATE_EMAIL":
        if (validator.isEmail(action.payload.value) || !value) {
          return {
            ...state,
            email: value,
            emailError: "",
          };
        } else {
          return {
            ...state,
            email: value,
            emailError: "Please enter a valid email.",
          };
        }
      case "SET_AND_VALIDATE_PASSWORD":
        if (validator.isStrongPassword(value) || !value) {
          return {
            ...state,
            password: value,
            passwordError: "",
          };
        } else {
          return {
            ...state,
            password: value,
            passwordError: "Please enter a valid password.",
          };
        }
      case "SET_AND_VALIDATE_CONFIRM_PASSWORD":
        if (state.password === value || !value) {
          return {
            ...state,
            confirmPassword: value,
            confirmPasswordError: "",
          };
        } else {
          return {
            ...state,
            confirmPassword: value,
            confirmPasswordError: "Passwords do not much.",
          };
        }
      case "CHECK_ALL_FIELDS_VALID":
        const allEmpty = action.payload.empty.every((item) => item === "");
        const allNotEmpty = action.payload.notEmpty.every(
          (item) => item !== ""
        );
        if (allEmpty && allNotEmpty) {
          return { ...state, buttonDisabled: false };
        } else {
          return { ...state, buttonDisabled: true };
        }
      default:
        return state;
    }
  }, initialState);
  return [state, dispatch];
}
