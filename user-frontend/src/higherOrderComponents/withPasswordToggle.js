import { useState } from "react";

const withPasswordToggle = (component) => {
  const Component = component;
  return ({ type, ...props }) => {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
      if (inputType === "password") {
        setInputType("text");
      } else {
        setInputType("password");
      }
    };

    return (
      <div className="pos-relative">
        <Component type={inputType} {...props} />
        {type === "password" && (
          <button className="eye-button" onClick={togglePasswordVisibility}>
            <i class="fa fa-eye eye" aria-hidden="true"></i>
          </button>
        )}
      </div>
    );
  };
};

export default withPasswordToggle;
