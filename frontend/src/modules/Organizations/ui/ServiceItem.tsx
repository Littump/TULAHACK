import { IServiceItem } from "@/modules/Services/types/ServicesTypes.ts";
import { useState } from "react";
import Modal from "@/ui/Modal.tsx";

interface Props {
  service: IServiceItem;
}

const ServiceItemHeading = ({ service }: Props) => {
  return (
    <div className="py-6 px-8 rounded-xl text-start border border-gray-400 flex gap-8 items-center">
      <img src={service.img} alt="" />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="text-sm text-gray-400">{service.info}</p>
      </div>
    </div>
  );
};
const ServiceItem = ({ service }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      className="w-[500px]"
      heading={<ServiceItemHeading service={service} />}
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
    >
      asd
    </Modal>
  );
};

export default ServiceItem;
