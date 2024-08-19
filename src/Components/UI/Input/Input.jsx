/* eslint-disable react/prop-types */
import  { useState } from "react";
import "./Input.scss";

const Input = ({
  type,
  onChange,
  className = "",
  autoComplete = "off",
  autoFocus = false,
  id,
  pattern,
  placeholder,
  icons = [],
  label,
  required,
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
        <label className="Input_label mb-2" htmlFor={id}>
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
          className={`Input font-jost font-normal text-base my-3 py-2 px-4 ${className}`}
          {...rest}
        />
        {icons.length > 0 && (
          <span
            className="Input_icon absolute right-2 cursor-pointer"
            onClick={handleIconClick}
          >
            {isPasswordVisible ? icons[1].element : icons[0].element}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
