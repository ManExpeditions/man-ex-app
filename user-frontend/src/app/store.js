import { configureStore } from "@reduxjs/toolkit";
import photoUploadSlice from "../slices/assets/photoUploadSlice";
import emailRegisterSlice from "../slices/auth/emailRegisterSlice";
import signinSlice from "../slices/auth/signinSlice";
import locationSlice from "../slices/services/locationSlice";
import userDeleteSlice from "../slices/user/userDeleteSlice";
import userUpdateSlice from "../slices/user/userUpdateSlice";
import userValidateSlice from "../slices/user/userValidateSlice";
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
    userValidateSlice: userValidateSlice,
    userDeleteSlice: userDeleteSlice,
    locationSlice: locationSlice,
    photoUploadSlice: photoUploadSlice,
  },
});
