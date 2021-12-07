import { configureStore } from "@reduxjs/toolkit";
import emailRegisterSlice from "../slices/auth/emailRegisterSlice";
import signinSlice from "../slices/auth/signinSlice";

export const store = configureStore({
  reducer: {
    emailRegisterSlice: emailRegisterSlice,
    signinSlice: signinSlice,
  },
});
