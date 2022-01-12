import { configureStore } from "@reduxjs/toolkit";
import emailRegisterSlice from "../slices/auth/emailRegisterSlice";
import signinSlice from "../slices/auth/signinSlice";
import locationSlice from "../slices/services/locationSlice";
import userUpdateSlice from "../slices/user/userUpdateSlice";
import verificationCodeSlice from "../slices/user/verificationCodeSlice";
import verifySlice from "../slices/user/verifySlice";

export const store = configureStore({
  preloadedState: {
    signinSlice: {
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    },
  },
  reducer: {
    emailRegisterSlice: emailRegisterSlice,
    signinSlice: signinSlice,
    verifySlice: verifySlice,
    verificationCodeSlice: verificationCodeSlice,
    userUpdateSlice: userUpdateSlice,
    locationSlice: locationSlice,
  },
});
