import React, { useState } from "react";
import { hsvaToHex, getContrastingColor } from "@uiw/color-convert";
import Swatch from "@uiw/react-color-swatch";
import { t } from "i18next";
import Input from "../../Components/UI/Input/Input";
import "./style.scss";
import Button from "../../Components/UI/Button/Button";
import { PlayIcon } from "../../Components/UI/checkMark/Playbtn";
function Point({ color, checked }) {
  console.log("Point Component Rendered");
  console.log("Color:", color);
  console.log("Checked:", checked ? "✔️" : "No");

  if (!checked) return null;

  return (
    <div
      style={{
        height: 64,
        width: 64,
        position: "absolute",
        top: 32,
        left: 32,
        borderRadius: "50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
        filter: `brightness(${checked ? 1 : 0.5})`,
        transform: "translate(-50%, -50%)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked ? <PlayIcon color={getContrastingColor(color)} /> : null}
    </div>
  );
}

function SwatchComponent({ color, onChange }) {
  return (
    <Swatch
      colors={[
        "#C781AB",
        "#D8AEFF",
        "#EBD5E2",
        "#F47799",
        "#F3B0C2",
        "#FFACED",
        "#FCD1FA",
        "#68C9DA",
        "#ACDEE7",
        "#96CD94",
        "#CCE2CB",
        "#ABFFC2",
        "#F4D674",
        "#F6EAC2",
        "#FBFB6F",
        "#FFFFB5",
        "#73A8FF",
        "#A2CAFC",
      ]}
      color={color}
      rectProps={{
        children: <Point />,
        style: {
          width: 64,
          height: 64,
          borderRadius: "50%",
        },
      }}
      onChange={(hsvColor) => {
        onChange(hsvaToHex(hsvColor));
      }}
    />
  );
}

const CreateTag = () => {
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="CreateTag ">
      <h1 className="title font-inter font-bold text-3xl text-black m-2">
        {t("createTag")}
      </h1>
      <div className="wrapper bg-white rounded-3xl p-3 m-2">
        <form action="submit">
          <Input
            label={t("TName")}
            placeholder={t("TName")}
            className="bg-white border border-purple mx-2 border-solid focus:border focus:border-purple focus:border-solid"
            type="name"
            required={true}
            id="name"
            autoComplete="name"
            autoFocus={true}
          />
          <div className="mt-4">
            <SwatchComponent color={color} onChange={setColor} />
          </div>

          <input type="hidden" name="color" value={color} />

          <div className="btn flex items-center justify-center md:justify-end m-4">
            <Button>{t("save")}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTag;
