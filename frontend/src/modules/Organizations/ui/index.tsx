import { IServiceItem } from "@/modules/Services/types/ServicesTypes.ts";
import img from "@/assets/service_item1.png";
import ServiceList from "@/modules/Services/ui/ServiceList.tsx";
import { Form, Formik } from "formik";
import Search from "@/ui/Search.tsx";
const Services = () => {
  const services: IServiceItem[] = [
    {
      title: "Яндекс 360",
      info: "Получение доступа к набору сервисов",
      id: 1,
      img,
    },
    {
      title: "Яндекс 360",
      info: "Получение доступа к набору сервисов",
      id: 2,
      img,
    },
    {
      title: "Яндекс 360",
      info: "Получение доступа к набору сервисов",
      id: 3,
      img,
    },
    {
      title: "Яндекс 360",
      info: "Получение доступа к набору сервисов",
      id: 4,
      img,
    },
  ];

  const initialValues = {
    search: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }) => {
        const servicesFiltered = services.filter(
          (el) =>
            el.title.toLowerCase().includes(values.search.toLowerCase()) ||
            el.info.toLowerCase().includes(values.search.toLowerCase()),
        );
        return (
          <Form className="flex gap-8 flex-col w-10/12">
            <Search name="search" className="border-violet-600" />
            <ServiceList services={servicesFiltered} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Services;
