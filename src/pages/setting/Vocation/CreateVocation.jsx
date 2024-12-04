import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { t } from "i18next";
import i18n from "../../../config/i18n";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import Loader from "../../../Components/Loader/Loader";
import { addVocation, getAllVocations } from "../../../Services/api";
import { toast } from "react-toastify";

const CreateVocation = () => {
  const lang = i18n.language;
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userId = user._id;
  const [vocations, setVocations] = useState([]);
  //   const [newVocations, setNewVocations] = useState([]);
  //   const [newVocationNameEN, setNewVocationNameEN] = useState("");
  //   const [newVocationNameAR, setNewVocationNameAR] = useState("");

  const [voc, setVoc] = useState({
    nameEN: "",
    nameAR: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVocations = async () => {
      setLoading(true);
      try {
        const res = await getAllVocations(userId, lang);
        setVocations(res.results);
      } catch (error) {
        console.error("Error fetching vocations:", error);
      } finally {
        setLoading(false);
      }
    };
    getVocations();
  }, [userId]);

  const handleAddVocation = async () => {
    try {
      const payload = {
        nameEN: voc.nameEN,
        nameAR: voc.nameAR,
        createdBy: user._id,
      };
      console.log("Sending voc to API:", payload);

      const response = await addVocation(token, payload, lang);
      console.log(`Voc added successfully:`, response);

      toast.success(t("toast.VocCreatedSuccess"));
      window.location.reload();
      setVoc({
        nameEN: "",
        nameAR: "",
      })

      return response;
    } catch (error) {
      console.error("Error saving vocation:", error);
      // toast.error(t("toast.VocCreationError"));
    }
  };

  //   const handleAddVocation = (e) => {
  //     e.preventDefault();
  //     const trimmedNameEN = newVocationNameEN.trim();
  //     const trimmedNameAR = newVocationNameAR.trim();

  //     if (!trimmedNameEN || !trimmedNameAR) {
  //       toast.error(t("Both vocation names (EN and AR) cannot be empty"));
  //       return;
  //     }

  //     const vocationData = {
  //       nameEN: trimmedNameEN,
  //       nameAR: trimmedNameAR,
  //     };

  //     const updatedVocations = [...vocations, vocationData];
  //     setVocations(updatedVocations);
  //     setNewVocations([...newVocations, vocationData]);
  //     onVocChange(updatedVocations);

  //     setNewVocationNameEN("");
  //     setNewVocationNameAR("");
  //   };

  //   const handleDeleteVocation = (vocationToDelete) => {
  //     const updatedVocations = vocations.filter(
  //       (voc) => voc !== vocationToDelete
  //     );
  //     const updatedNewVocations = newVocations.filter(
  //       (voc) => voc !== vocationToDelete
  //     );

  //     setVocations(updatedVocations);
  //     setNewVocations(updatedNewVocations);
  //   };

  return (
    <div className="CreateVocation">
      {loading ? (
        <div className="loader flex items-center justify-center m-auto">
          <Loader />
        </div>
      ) : (
        <div className="wrapper bg-white rounded-3xl p-3 m-2">
          <h6 className="font-semibold text-sm leading-4">{t("Vocations")}</h6>

          {vocations.length > 0 ? (
            <div className="PreviousTags grid grid-cols-2 md:grid-cols-4  gap-2 bg-white rounded-3xl p-4 shadow-lg">
              {vocations.map((voc, index) => (
                <div
                  key={index}
                  className="voc col-span-1 rounded-3xl p-1 text-center relative bg-gray-100 text-sm "
                >
                  {voc.name}
                  {/* {newVocations.includes(voc) && (
                    <button
                      className="absolute rounded-full bg-white w-6 -top-3 right-2"
                      onClick={() => handleDeleteVocation(voc)}
                    >
                      <span className="w-4 font-semibold text-sm">
                        &#x2715;
                      </span>
                    </button>
                  )} */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm leading-4 text-gray-600">
              {t("No Previous Vocation")}
            </div>
          )}

          <h6 className="font-semibold text-sm leading-4 my-4">
            {t("+ Add new vocation")}
          </h6>

          <form onSubmit={handleAddVocation} className="py-5 px-3 lg:px-8">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2">
                <Input
                  label={t("VName")}
                  placeholder={t("Enter vocation name in English")}
                  className="bg-white border border-purple mx-2 border-solid focus:border focus:border-purple focus:border-solid"
                  type="text"
                  required={true}
                  value={voc.nameEN}
                  onChange={(e) =>
                    setVoc((prev) => ({ ...prev, nameEN: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-2">
                <Input
                  label={t("VName")}
                  placeholder={t("Enter vocation name in Arabic")}
                  className="bg-white text-start border border-purple mx-2 border-solid focus:border focus:border-purple focus:border-solid"
                  type="text"
                  label_class={""}
                  required={true}
                  value={voc.nameAR}
                  onChange={(e) =>
                    setVoc((prev) => ({ ...prev, nameAR: e.target.value }))
                  }
                />
            </div>
            </div>

            <div className="btn flex items-center justify-center md:justify-end m-4">
              <Button
                className="!font-bold text-base !px-10"
                onClick={handleAddVocation}
              >
                {t("+ Add new vocation")}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateVocation;
