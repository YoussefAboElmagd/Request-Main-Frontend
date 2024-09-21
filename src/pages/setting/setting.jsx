import Button from "../../Components/UI/Button/Button";

const Setting = () => {
  return (
    <div className="Settings">
      <div className="wrapper bg-white rounded-xl p-4 m-2">
        <div className="head flex justify-between  items-center ">
          <p className="font-semibold text-base">General</p>
          <div className="saveChanges">
            <Button className={"!px-12 font-medium"}>Save Changes</Button>
          </div>
          </div>
          <div className="switchTabs">
            <div className="tab active">
              <p className="font-medium text-sm">General</p>
            </div>
            <div className="tab">
              <p className="font-medium text-sm">Notifications</p>
            </div>
            <div className="tab">
              <p className="font-medium text-sm">Privacy</p>
            </div>
            <div className="tab">
              <p className="font-medium text-sm">Security</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Setting;
