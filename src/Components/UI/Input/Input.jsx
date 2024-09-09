/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Input.scss";

const Input = ({
  type,
  onChange,
  className = "",
  autoComplete = "off",
  autoFocus = false,
  id,
  pattern,
  value,
  placeholder,
  inputIcons = [],
  label,
  labelIcon, 
  required,
  iconClass,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleIconClick = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="Input_container">
      {label && (
        <label
          className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2 "
          htmlFor={id}
        >
          {labelIcon && (
            <span className="label-icon w-4 h-4 ">{labelIcon}</span>
          )}

          {label}
        </label>
      )}
      <div className="Input_wrapper flex items-center relative">
        <input
          type={inputType}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          id={id}
          pattern={pattern}
          placeholder={placeholder}
          required={required}
          value={value}
          className={`Input font-jost font-normal text-base  my-2 py-2 px-4 ${className}`}
          {...rest}
        />
        {inputIcons.length > 0 && (
          <span
            className={`Input_icon absolute cursor-pointer right-4 ${iconClass}`}
            onClick={handleIconClick}
          >
            {isPasswordVisible
              ? inputIcons[1]?.element
              : inputIcons[0]?.element}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
