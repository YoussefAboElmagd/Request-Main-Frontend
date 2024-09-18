import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Swatch from "@uiw/react-color-swatch";
import Signature from "@uiw/react-signature";
import { hsvaToHex } from "@uiw/color-convert";
import React, { useRef, useState, useEffect } from "react";
import { CgImage } from "react-icons/cg";
import { FaSignature, FaEdit } from "react-icons/fa";
import { PiSignatureBold } from "react-icons/pi";
import { RiCloseCircleLine, RiDeleteBinLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";

// Point component for swatch
function Point({ color, checked }) {
  if (!checked) return null;
  return <div style={{ height: 24, width: 24, borderRadius: "4px" }}></div>;
}

// Swatch component to choose colors
function SwatchComponent({ color, onChange }) {
  return (
    <Swatch
      colors={["#1300EE", "#B10F03", "#606C80", "#000"]}
      color={color}
      rectProps={{
        children: <Point color={color} checked={color === color} />,
        style: {
          width: 24,
          height: 24,
          borderRadius: "4px",
        },
      }}
      onChange={(hsvColor) => {
        const hexColor = hsvaToHex(hsvColor);
        onChange(hexColor);
      }}
    />
  );
}

// Signature Button Component
export function SignatureBtn() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#000");
  const [fontWeight, setFontWeight] = useState("normal");
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPadRef = useRef(null);

  useEffect(() => {
    // Load saved signature from localStorage on mount
    const savedSignature = localStorage.getItem("trimmedSignature");
    if (savedSignature) {
      setTrimmedDataURL(savedSignature);
    }
  }, []);

  // Function to handle clear
  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
      localStorage.removeItem("trimmedSignature");
      setTrimmedDataURL(null);
      console.log("Signature cleared", trimmedDataURL);
    }
  };

  // Function to handle opening and closing the dialog
  const handleOpen = () => {
    setOpen(!open);

    if (trimmedDataURL) {
      console.log("Reloading signature from localStorage:", trimmedDataURL);
    }
  };

  // Function to change font weight
  const handleFontWeightChange = (weight) => {
    setFontWeight(weight);
  };

  // Handle signature edit - load the saved signature back into the pad
  const handleEdit = () => {
    handleOpen();
    console.log("////////", trimmedDataURL);

    if (trimmedDataURL) {
      console.log(sigPadRef.current, "---------------", trimmedDataURL);

      // Load the existing signature
      console.log(sigPadRef.current.load(trimmedDataURL));

      sigPadRef.current.load(trimmedDataURL);
    }
  };

  const handleTrim = () => {
    if (sigPadRef.current && sigPadRef.current.svg) {
      try {
        const svgElement = sigPadRef.current.svg;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const trimmedDataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          svgData
        )}`;

        setTrimmedDataURL(trimmedDataURL);
        localStorage.setItem("trimmedSignature", trimmedDataURL);

        const uniqueId = uuidv4().slice(0, 4);
        const a = document.createElement("a");
        a.href = trimmedDataURL;
        a.download = `signature_${uniqueId}.svg`;
        a.click();

        handleOpen(false); // Close dialog after saving
      } catch (error) {
        console.error("Error during trimming or saving signature:", error);
      }
    }
  };

  const signatureOptions = {
    size:
      fontWeight === "lighter"
        ? 2
        : fontWeight === "bold"
        ? 8
        : fontWeight === "normal"
        ? 6
        : 6,
    smoothing: 0.46,
    thinning: 0.73,
    streamline: 0.5,
    start: {
      taper: 0,
      cap: true,
    },
    end: {
      taper: 0,
      cap: true,
    },
  };

  return (
    <>
      <img className="" src={trimmedDataURL} alt="Signature" />
      <div className="box flex justify-between items-center bg-white py-2 px-6 gap-2 rounded-2xl m-2 shadow-md cursor-pointer  ">
        <button
          onClick={handleOpen}
          className="flex justify-start items-center  "
        >
          <span
            className="icon_wrapper rounded-2xl p-5 my-2 mx-4 "
            style={{ background: "#CCABDA33" }}
          >
            <PiSignatureBold className="text-purple w-6 h-6" />
          </span>
          {/* {trimmedDataURL ? (
            <img
              className="w-[66px] h-[62px] object-contain rounded-lg  border border-solid border-purple"
              src={trimmedDataURL}
              alt="Signature"
            />
          ) : ( */}
          <span className="font-workSans font-semibold text-xl leading-5">
            Signature
          </span>
          {/* )} */}
        </button>
        <div className="Signature_fun">
          {trimmedDataURL && (
            <div className="flex items-center justify-between gap-4">
              <button className="clear" onClick={handleClear}>
                <RiDeleteBinLine className="text-red w-5 h-5" />
              </button>

              <button onClick={handleEdit}>
                <FaEdit className="text-purple w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex items-center justify-center relative">
          <div className="flex items-center justify-between gap-7">
            <p className="text-gray flex items-center gap-2 font-workSans font-semibold text-base cursor-pointer">
              <CgImage className="text-gray w-5 h-5" /> Image
            </p>
            <p className="text-purple flex items-center gap-2 font-workSans font-semibold text-base">
              <FaSignature className="text-purple w-5 h-5" /> Draw
            </p>
          </div>
          <button onClick={handleOpen}>
            <RiCloseCircleLine className="text-red absolute right-4 top-4 cursor-pointer" />
          </button>
        </DialogHeader>
        <DialogBody>
          <Signature
            ref={sigPadRef}
            fill={color}
            options={signatureOptions}
            style={{
              "--w-signature-background": "#fff",
              fontWeight: fontWeight,
            }}
          />
        </DialogBody>
        <DialogFooter className="flex items-center justify-between gap-3">
          <button className="clear" onClick={handleClear}>
            <RiDeleteBinLine className="text-red w-5 h-5" />
          </button>
          <div className="Select_color">
            <SwatchComponent color={color} onChange={setColor} />
            <input type="hidden" name="color" value={color} />
          </div>
          <div className="Select_font flex items-center gap-3 cursor-pointer">
            <button onClick={() => handleFontWeightChange("lighter")}>
              <FaSignature className="w-5 h-5 font-light" />
            </button>
            <button onClick={() => handleFontWeightChange("normal")}>
              <FaSignature className="w-5 h-5 font-medium" />
            </button>
            <button onClick={() => handleFontWeightChange("bold")}>
              <FaSignature className="w-5 h-5 font-extrabold" />
            </button>
          </div>
          <button
            className="save bg-linear_1 text-white px-4 py-2 rounded-md"
            onClick={handleTrim}
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
