import React from "react";
import ReactSelect from "react-select";
import "../Input/Input.scss";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    border: "1px solid var(--purple)", 
    borderRadius: "15px", 
    padding: "5px",
    minHeight: "42px",
    boxShadow: "none", 
    "&:hover": { borderColor: "var(--purple)" }, 
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#FFDD94",
    "&:hover": { color: "#FFDD94" },
  }),
  indicatorSeparator: () => ({ display: "none" }), 
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "var(--purple)" : "white",
    color: state.isSelected ? "white" : "var(--gray)",
    padding: "10px",
    borderRadius: "8px", 
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--purple)", 
      color: "white",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    marginTop: "4px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  }),
};

const Select = ({
  label,
  id,
  options = [],
  value,
  onChange,
  className,
  placeholder,
  isDisabled = false,
  isClearable = true,
  isSearchable = true,
}) => {
  return (
    <div className={`Input_container flex flex-col ${className}`}>
      {label && (
        <label
          className="Input_label flex items-center justify-start gap-2 font-jost text-base font-medium mx-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <ReactSelect
        id={id}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption?.value)}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        classNamePrefix="select"
        styles={customStyles}
      />
    </div>
  );
};

export default Select;
