/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Input.scss";

const UiInput = ({
  type,
  onChange,
  className = "",
  autoComplete = "off",
  autoFocus = false,
  id,
  pattern,
  value,
  placeholder,

  label,

  required,

  ...rest
}) => {
  return (
    <div className="Input_container flex flex-col   ">
      {label && (
        <label
          className="label_UI  text-sm font-medium text-gray-700 flex justify-start"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        onChange={onChange}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={id}
        pattern={pattern}
        placeholder={placeholder}
        required={required}
        value={value}
        className={`Input_UI p-2 border border-gray-300 rounded-xl ${className}`}
        {...rest}
      />
    </div>
  );
};

export default UiInput;
