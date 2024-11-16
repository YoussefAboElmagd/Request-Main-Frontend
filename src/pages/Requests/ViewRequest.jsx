import { t } from "i18next";
import avatar  from "../../assets/images/avatar1.png"
import signature  from "../../assets/images/signature.png"

const ViewRequest = () => {


    
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  return (
    <div className="ViewRequest">
      <div className="header bg-white p-4 rounded-l-3xl">
        <h5 className="font-bold text-base">
          Request for material & Equipment inspection
        </h5>
      </div>
      <div className="content bg-white p-4 rounded-3xl my-6 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-3">
              <img
                src={avatar}
                alt="consultant avatar"
                className="w-20 h-20 rounded-full  border  border-red border-solid"
              />
              <span className="text-purple-dark  underline underline-offset-1 font-bold  text-sm">
                consultant name
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <img
                src={avatar}
                alt="consultant avatar"
                className="w-20 h-20 rounded-full  border  border-red border-solid"
              />
              <span className="text-purple-dark  underline underline-offset-1 font-bold  text-sm">
                Contractor name
              </span>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="Ref flex items-center gap-2 my-6">
              <label
                htmlFor="Ref"
                className="font-bold text-base text-gray-dark"
              >
                {t("REF NO")}
              </label>
              <input
                type="text"
                id="Ref"
                placeholder="ref no"
                // onChange={(e) => setRefNO(e.target.value)}
                className="bg-white border border-gray rounded-lg p-1 max-w-52"
              />
            </div>
            <div className="Date flex items-center gap-2 ">
              <label
                htmlFor="currentDay"
                className="font-bold text-base text-gray-dark"
              >
                {t("Date")}
              </label>
              <div className="inputs">
                <input
                  type="text"
                  id="currentDay"
                  name="Date"
                  value={`${currentDay}`}
                  className="bg-white border border-gray rounded-2xl max-w-12 font-medium text-center mx-1 "
                  disabled
                />
                <input
                  type="text"
                  id="currentMonth"
                  name="Date"
                  value={`${currentMonth}`}
                  className="bg-white border border-gray rounded-2xl max-w-12 font-medium text-center mx-1 "
                  disabled
                />
                <input
                  type="text"
                  id="currentYear"
                  name="Date"
                  value={`${currentYear}`}
                  className="bg-white border border-gray rounded-2xl max-w-16 font-medium text-center mx-1 "
                  disabled
                />
              </div>
            </div>  
          </div>
        </div>
        <hr className="bg-gray my-4" />
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg">{t("PName")} : </h3>
          <span className="text-sm  font-bold"> Building a villa</span>
        </div>
        <hr className="bg-gray my-4" />
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <h5 className="font-bold text-base text-gray-dark">
              {t("Discipline")}
            </h5>
            <input
              type="text"
              disabled
              value={"Architectural"}
              className="bg-white w-fit  text-center border  border-solid border-gray rounded-2xl p-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <h5 className="font-bold text-base text-gray-dark">
              {t("Action Code")}
            </h5>
            <input
              type="text"
              disabled
              value={"Approved"}
              className="bg-white border  w-fit  text-center border-solid border-gray rounded-2xl p-2"
            />
          </div>
        </div>
        <div className="feedback my-4">
          <h5 className="font-bold  text-base">consultants Comment</h5>
          <input
            type="text"
            disabled
            value={"Feedback from consultant"}
            className="bg-white w-full my-1 text-gray border  border-solid border-gray rounded-2xl p-2"
          />
          <input
            type="text"
            disabled
            value={"Feedback from consultant"}
            className="bg-white w-full my-1 text-gray border  border-solid border-gray rounded-2xl p-2"
          />
        </div>
        <div className="flex items-center gap-3 my-4">
          <div className="flex flex-col gap-2">
            <h5 className="font-bold text-base text-gray-dark">
              Reviewed by :
            </h5>
            <span className="font-medium text-sm">fadl mohamed</span>
            <img src={signature} alt="signature" className="w-14 h-14" />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-bold text-base text-gray-dark">Noted by :</h5>
            <span className="font-medium text-sm">Ahmed mohamed</span>
            <img src={signature} alt="signature" className="w-14 h-14" />
          </div>
        </div>
        <hr className="bg-gray my-4" />
        <div className="desc ">
          <label htmlFor="desc" className="font-bold text-base text-gray-dark">
            {t("desc")}
          </label>
          <input
            type="text"
            id="desc"
            disabled
            value={t("desc")}
            className="bg-white border  my-1 w-full  text-gray border-solid border-gray rounded-2xl p-2"
          />
        </div>
        <div className="grid grid-cols-4 gap-3 my-4">
          <div className="col-span-2">
            <label
              htmlFor="desc"
              className="font-bold text-base text-gray-dark"
            >
              manufacturer / supplier
            </label>
            <input
              type="text"
              id="desc"
              disabled
              value={"Ahmed mohamed"}
              className="bg-white my-1 border  w-full  text-gray border-solid border-gray rounded-2xl p-2"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label
              htmlFor="desc"
              className="font-bold text-base text-gray-dark"
            >
              approved material submittal no
            </label>
            <input
              type="text"
              id="desc"
              disabled
              value={"123"}
              className="bg-white border my-1  w-fit  text-gray border-solid border-gray rounded-2xl p-2"
            />
          </div>
        </div>
        <div className="flex items-center  gap-3 my-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="BOQ item no"
              className="font-bold text-base text-gray-dark"
            >
              BOQ item no
            </label>
            <input
              type="text"
              id="BOQ item no"
              disabled
              value={"#123"}
              className="bg-white border  my-1 w-fit  text-gray border-solid border-gray rounded-2xl p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="QTY" className="font-bold text-base text-gray-dark">
              QTY
            </label>
            <input
              type="text"
              id="QTY"
              disabled
              value={"12"}
              className="bg-white border  my-1 w-fit  text-gray border-solid border-gray rounded-2xl p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="Unit"
              className="font-bold text-base text-gray-dark"
            >
              {t("Unit")}
            </label>
            <input
              type="text"
              id="Unit"
              disabled
              value={"kg"}
              className="bg-white border  my-1 w-fit  text-gray border-solid border-gray rounded-2xl p-2"
            />
          </div>
        </div>
        <div className="flex items-center  gap-3 my-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="delivery note no"
              className="font-bold text-base text-gray-dark"
            >
              delivery note no
            </label>
            <input
              type="text"
              id="delivery note no"
              disabled
              value={"@123"}
              className="bg-white border  my-1 w-fit  text-gray border-solid border-gray rounded-2xl p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="Action code"
              className="font-bold text-base text-gray-dark"
            >
              Action code
            </label>
            <input
              type="text"
              id="Action code"
              disabled
              value={"00"}
              className="bg-white border  my-1 w-fit  text-gray border-solid border-gray rounded-2xl p-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h5 className="font-bold text-base text-gray-dark">submitted by:</h5>
          <span className="font-medium text-sm">fadl mohamed</span>
          <img src={signature} alt="signature" className="w-14 h-14" />
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
