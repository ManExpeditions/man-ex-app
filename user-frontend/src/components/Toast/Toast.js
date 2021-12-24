import { ToastContainer } from "react-toastify";

import React from "react";

export default function Toast({
  postion = "top-right",
  autoClose = 5000,
  hideProgressBar = false,
  newestOnTop = true,
  pauseOnHover = true,
}) {
  return (
    <ToastContainer
      position={postion}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      rtl={false}
      draggable
      pauseOnHover={true}
    />
  );
}
