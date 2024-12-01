import { FiSettings } from "react-icons/fi";
import servicesImage from "../../assets/images/services.png";
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
    <div className="services !bg-light lg:h-screen grid grid-cols-1  lg:grid-cols-4 gap-6 ltr:pl-4 rtl:pr-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-3  lg:hidden">
        <div className="col-span-1 flex flex-col bg-linear_1 text-white p-2  rounded-3xl">
          <span className="font-bold text-2xl text-white ">900+</span>
          <span className="font-medium text-base">{t("happyClient")}</span>
        </div>
        <div className="col-span-1 flex flex-col bg-linear_1 text-white p-2  rounded-3xl">
          <span className="font-bold text-2xl text-white ">300+</span>
          <span className="font-medium text-base">{t("amazingProjects")}</span>
        </div>
        <div className="col-span-1 flex flex-col bg-linear_1 text-white p-2  rounded-3xl">
          <span className="font-bold text-2xl text-white ">200+</span>
          <span className="font-medium text-base">{t("successPartner")}</span>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2 mt-6">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-purple-dark">
          {t("servicesLanding.head")}
        </h1>
        <p className="font-medium text-sm sm:text-base lg:text-lg text-gray">
          {t("servicesLanding.subHead")}
        </p>
        <div className="mt-6">
          <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-purple-dark my-3">
            {t("servicesLanding.HeadServices")}
          </h3>
          <ul className="services_list font-medium text-sm sm:text-base lg:text-lg text-gray">
            {services.map((service, index) => (
              <li key={index} className="flex items-start space-x-3 mb-4">
                <span className="text-xl text-blue mx-2">{service.icon}</span>
                <div>
                  <h4 className="font-bold text-base lg:text-lg text-gray-dark inline">
                    {service.title} :
                  </h4>
                  <p className="text-gray text-sm lg:text-base inline">
                    {service.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2 relative">
        <img
          src={servicesImage}
          alt="servicesImage"
          className="h-[40vh] sm:h-[60vh] lg:h-[70vh] hidden lg:block lg:w-3/4 object-cover absolute right-0 rtl:scale-x-[-1]"
          loading="lazy"
        />
        <div className="box_services absolute rtl:rounded-r-xl ltr:rounded-l-xl bg-linear_1 p-4 h-[15vh] hidden lg:grid  grid-cols-3 items-center gap-2 text-white w-4/5 rtl:left-0 ltr:right-0 lg:bottom-20">
          <div className="col-span-1 flex flex-col">
            <span className="font-bold text-2xl">900+</span>
            <span className="font-medium text-base">{t("happyClient")}</span>
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
      </div>
    </div>
  );
};

export default Services;
