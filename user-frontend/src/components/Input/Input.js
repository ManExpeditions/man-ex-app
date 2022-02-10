import React from "react";
import { forwardRef } from "react";
import withPasswordToggle from "../../higherOrderComponents/withPasswordToggle";

const Input = forwardRef(
  ({ value, placeholder, dispatch, actionType, payload, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          dispatch({
            type: actionType,
            payload: { ...payload, value: e.target.value },
          })
        }
      />
    );
  }
);

export default Input;
export const InputPassword = withPasswordToggle(Input);
