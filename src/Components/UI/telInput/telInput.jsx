/* eslint-disable react/prop-types */
import "react-international-phone/style.css";
import "../Input/Input.scss";
import { InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import Input from "../Input/Input";

export const TelPhone = ({ value, onChange = () => {}, ...restProps }) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "sa",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <div className=" Input_wrapper ">
      <Input
        className="phone_input Input"
        placeholder="Phone number"
        value={inputValue}
        onChange={handlePhoneValueChange}
        type="tel"
        ref={inputRef}
        {...restProps}
      />
      <InputAdornment
        position="end"
        className="Input_icon"
        style={{
          borderRight: "1px solid rgba(155, 155, 155, 1)",
          borderRadius: "8px 0 0 8px",
          paddingInline: "7px",
          position: "absolute",
        }}
      >
        <Select
          MenuProps={{
            style: {
              height: "300px",
              width: "360px",
              top: "10px",
              left: "-34px",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
          sx={{
            width: "max-content",
            fieldset: {
              display: "none",
            },
            '&.Mui-focused:has(div[aria-expanded="false"])': {
              fieldset: {
                display: "block",
              },
            },
            ".MuiSelect-select": {
              padding: "8px",
              paddingRight: "24px !important",
            },
            svg: {
              right: 0,
            },
          }}
          value={country.iso2}
          onChange={(e) => setCountry(e.target.value)}
          renderValue={(value) => (
            <FlagImage iso2={value} style={{ display: "flex" }} />
          )}
        >
          {defaultCountries.map((c) => {
            const country = parseCountry(c);
            return (
              <MenuItem key={country.iso2} value={country.iso2}>
                <FlagImage iso2={country.iso2} style={{ marginRight: "8px" }} />
                <Typography marginRight="8px">{country.name}</Typography>
                <Typography color="gray">+{country.dialCode}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      </InputAdornment>
    </div>
  );
};
