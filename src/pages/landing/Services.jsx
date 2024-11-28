import { FiSettings } from "react-icons/fi";
import servicesImage from "../../assets/images/services.png"
import { t } from "i18next";
const Services = () => {
    const services = [
      {
        icon: <FiSettings />,
        title: t("servicesLanding.title1"),
        description: t("servicesLanding.message1"),
      },
      {
        icon: <FiSettings />,
        title: t("servicesLanding.title2"),
        description: t("servicesLanding.message2"),
      },
      {
        icon: <FiSettings />,
        title: t("servicesLanding.title3"),
        description: t("servicesLanding.message3"),
      },
      {
        icon: <FiSettings />,
        title: t("servicesLanding.title4"),
        description: t("servicesLanding.message4"),
      },
    ];
  return (
    <div className="services !bg-light lg:h-screen   grid grid-cols-2 lg:grid-cols-4 gap-3 ltr:pl-8 rtl:pr-8 py-8 relative ">
      <div className="Services col-span-2 mt-6 ">
        {/* <div className="effect absolute"></div> */}
        <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl text-purple-dark">
          {t("servicesLanding.head")}
        </h1>
        <p className="font-medium ltr:text-sm lg:ltr:text-base rtl:text-base lg:rtl:text-xl text-gray">
          {t("servicesLanding.subHead")}
        </p>
        <div className="mt-6">
          <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl text-purple-dark my-3">
            {t("servicesLanding.HeadServices")}
          </h3>
          <ul className="services_list font-medium ltr:text-base lg:ltr:text-lg rtl:text-lg lg:rtl:text-2xl text-gray">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 mb-4 max-w-2xl"
              >
                <span className="text-xl text-blue mx-2">{service.icon}</span>
                <div>
                  <h4 className="font-bold text-base lg:text-lg text-gray-dark inline">
                    {service.title} :
                  </h4>
                  <p className="text-gray text-sm lg:text-base inline">
                    {" "}
                    {service.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div className="col-span-2 relative">
        <img
          src={servicesImage}
          alt="servicesImage"
          className="h-[40vh] lg:h-[70vh] w-full lg:w-3/4 object-cover  absolute  ltr:right-0  rtl:left-0 rtl:scale-x-[-1]"
          loading="lazy"
        />
        <div className="box_services absolute rtl:rounded-r-xl ltr:rounded-l-xl bg-linear_1 p-4 h-[15vh] grid grid-cols-3 items-center gap-2 text-white w-4/5 rtl:left-0 ltr:right-0 bottom-4">
          <div className="col-span-1 flex flex-col">
            <span className="font-bold text-2xl">900+</span>
            <span className="font-medium text-base ">{t("happyClient")}</span>
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="font-bold text-2xl">300+</span>
            <span className="font-medium text-base">
              {t("amazingProjects")}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="font-bold text-2xl">200+</span>
            <span className="font-medium text-base">{t("successPartner")}</span>
          </div>
        </div>
      </div> */}
      <div className="col-span-2 ">
        <div className="relative ">
          <img
            src={servicesImage}
            alt="servicesImage"
            className="h-[40vh] lg:h-[70vh] w-3/4  object-cover  absolute right-0 rtl:scale-x-[-1]"
            loading="lazy"
          />

          <div className="box_services absolute rtl:rounded-r-xl ltr:rounded-l-xl bg-linear_1 p-4 h-[15vh] grid grid-cols-3 items-center gap-2 text-white w-4/5 rtl:left-0 ltr:right-0 -bottom-[40rem]">
            <div className="col-span-1 flex flex-col">
              <span className="font-bold text-2xl">900+</span>
              <span className="font-medium text-base ">{t("happyClient")}</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="font-bold text-2xl">300+</span>
              <span className="font-medium text-base">
                {t("amazingProjects")}
              </span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="font-bold text-2xl">200+</span>
              <span className="font-medium text-base">
                {t("successPartner")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
