import { configureStore } from "@reduxjs/toolkit";
import emailRegisterSlice from "../slices/auth/emailRegisterSlice";
import signinSlice from "../slices/auth/signinSlice";

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
  },
});
