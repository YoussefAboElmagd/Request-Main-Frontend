import React, { useEffect, useState } from "react";
import { hsvaToHex } from "@uiw/color-convert";
import Swatch from "@uiw/react-color-swatch";
import { t } from "i18next";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import Loader from "../../../Components/Loader/Loader";
import { getAllTags } from "../../../Services/api";
import "./style.scss";
import { PlayIcon } from "../../../Components/UI/checkMark/Playbtn";

function Point({ checked }) {
  if (!checked) return null;

  return (
    <div
      style={{
        height: 40,
        width: 40,
        position: "absolute",
        top: 20,
        left: 20,
        borderRadius: "50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.5,
        filter: `brightness(${checked ? 1 : 0.5})`,
        transform: "translate(-50%, -50%)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked ? <PlayIcon color={"white"} /> : null}
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
        style: { width: 40, height: 40, borderRadius: "50%" },
        children: <Point />,
      }}
      onChange={(hsvColor) => onChange(hsvaToHex(hsvColor))}
    />
  );
}

const CreateTag = ({ onTagsChange }) => {
  const [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    const getTags = async () => {
      setLoading(true);
      try {
        const result = await getAllTags();
        setTags(result.results);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };
    getTags();
  }, []);

  // Function to handle form submission and add the new tag
  const handleAddTag = (e) => {
    e.preventDefault();

    const TagData = { name: newTagName, colorCode: color };
    console.log("Tag Data from create :" ,  TagData );
    
    // Optimistically update the UI
     const updatedTags = [...tags, TagData];
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <div className="CreateTag ">
      {loading ? (
        <div className="loader flex items-center justify-center m-auto">
          <Loader />
        </div>
      ) : (
        <div className="wrapper bg-white rounded-3xl p-3 m-2">
          <h6 className="font-semibold text-sm leading-4">
            {t("Previous tags")}
          </h6>
          <div className="PreviousTags grid grid-cols-6 gap-2 bg-white rounded-3xl p-4 shadow-lg">
            {tags.map((tag, index) => (
              <div
                key={index}
                className={`tag col-span-1 rounded-3xl p-1 text-center`}
                style={{
                  background: `${tag.colorCode}40`, // Opacity 25%
                  color: tag.colorCode,
                }}
              >
                {tag.name}
              </div>
            ))}
          </div>

          <h6 className="font-semibold text-sm leading-4 my-4">
            {t("+ Add new tag")}
          </h6>

          <form onSubmit={handleAddTag} className="py-5 px-8">
            <Input
              label={t("TName")}
              placeholder={t("TName")}
              className="bg-white border border-purple mx-2 border-solid focus:border focus:border-purple focus:border-solid"
              type="text"
              required={true}
              id="name"
              autoComplete="off"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />

            <div className="mt-4">
              <SwatchComponent color={color} onChange={setColor} />
            </div>

            <input type="hidden" name="color" value={color} />

            <div className="btn flex items-center justify-center md:justify-end m-4 ">
              <Button className={"!font-bold text-base !px-10"} type="submit">
                {t("+ Add new tag")}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTag;
