import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Swatch from "@uiw/react-color-swatch";
import Signature from "@uiw/react-signature";
import { hsvaToHex, getContrastingColor } from "@uiw/color-convert";
import React, { useRef, useState } from "react";
import { CgImage } from "react-icons/cg";
import { FaSignature } from "react-icons/fa";
import { PiSignatureBold } from "react-icons/pi";
import { RiCloseCircleLine, RiDeleteBinLine } from "react-icons/ri";
import { PlayIcon } from "../UI/checkMark/Playbtn";

// Point component for swatch
function Point({ color, checked }) {
  if (!checked) return null;

  return (
    <div
      style={{
        height: 24,
        width: 24,
        position: "absolute",
        top: 32,
        left: 32,
        borderRadius: "4px",
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
        onChange(hsvaToHex(hsvColor));
        console.log(hsvaToHex(hsvColor));
        
      }}
    />
  );
}

// Convert points to SVG path
const pointsToSVGPath = (points) => {
  if (!points || points.length === 0) return "";

  // Ensure points are properly formatted
  const d = points
    .map((point, index) => {
      const [x, y] = point;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return d;
};

export function SignatureBtn() {
  const $svg = useRef(null);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#000");
  const [fontWeight, setFontWeight] = useState("normal");
  const [points, setPoints] = useState([]);
  const [savedSignature, setSavedSignature] = useState(null);

  // Function to clear the signature canvas
  const handleClear = () => {
    $svg.current?.clear();
    setPoints([]);
  };

  // Function to handle opening and closing the dialog
  const handleOpen = () => setOpen(!open);

  // Function to change font weight
  const handleFontWeightChange = (weight) => {
    setFontWeight(weight);
  };

  // Function to handle saving the signature
  const handleSave = () => {
    const signatureCanvas = $svg.current;
    console.log(signatureCanvas);

    if (signatureCanvas) {
      setSavedSignature(signatureCanvas);
      localStorage.setItem("signature", signatureData);
      console.log("Signature saved to local storage!");
    } else {
      console.log("Canvas not found");
    }
    handleOpen(false);
  };

  // Handle signature points
  const handlePoints = (data) => {
    if (data.length > 0) {
      setPoints(data); // Directly set points
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
      <button
        className="box flex justify-center items-center bg-white py-2 px-6 gap-2 rounded-2xl m-2 shadow-md cursor-pointer"
        onClick={handleOpen}
      >
        <span
          className="icon_wrapper rounded-2xl p-5 my-2 mx-4"
          style={{
            background: "#CCABDA33",
          }}
        >
          <PiSignatureBold className="text-purple w-6 h-6" />
        </span>
        <span className="font-workSans font-semibold text-xl leading-5">
          Signature
        </span>
        {savedSignature && (
          <div>
            <svg
              viewBox="0 0 500 500"
              style={{ width: "100px", height: "auto" }}
            >
              <path
                d={pointsToSVGPath(points)}
                fill="none"
                stroke={color}
                strokeWidth={signatureOptions.size}
              />
            </svg>
          </div>
        )}
      </button>
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
              <span>
                <CgImage className="text-gray w-5 h-5" />
              </span>
              Image
            </p>
            <p className="text-purple flex items-center gap-2 font-workSans font-semibold text-base">
              <span>
                <FaSignature className="text-purple w-5 h-5" />
              </span>
              Draw
            </p>
          </div>
          <button onClick={handleOpen}>
            <span className="absolute right-4 top-4 cursor-pointer">
              <RiCloseCircleLine className="text-red" />
            </span>
          </button>
        </DialogHeader>
        <DialogBody>
          <Signature
            ref={$svg}
            fill={color}
            options={signatureOptions}
            onPointer={handlePoints}
            style={{
              "--w-signature-background": "#fff",
              fontWeight: fontWeight,
            }}
          />
        </DialogBody>
        <DialogFooter className="flex items-center justify-between gap-3">
          <button className="clear" onClick={handleClear}>
            <span>
              <RiDeleteBinLine className="text-red w-5 h-5" />
            </span>
          </button>
          <div className="Select_color">
            <SwatchComponent color={color} onChange={setColor} />
            <input type="hidden" name="color" value={color} />
          </div>
          <div className="Select_font flex items-center gap-3 cursor-pointer">
            <button onClick={() => handleFontWeightChange("lighter")}>
              <span className="light cursor-pointer">
                <FaSignature className="w-5 h-5 font-light" />
              </span>
            </button>
            <button onClick={() => handleFontWeightChange("normal")}>
              <span className="normal cursor-pointer">
                <FaSignature className="w-5 h-5 font-medium" />
              </span>
            </button>
            <button onClick={() => handleFontWeightChange("bold")}>
              <span className="bold cursor-pointer">
                <FaSignature className="w-5 h-5 font-extrabold" />
              </span>
            </button>
          </div>
          <div className="save">
            <button
              className="save_btn flex items-center gap-2 font-workSans font-semibold text-base bg-linear_1 py-2 px-4 rounded-xl text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
