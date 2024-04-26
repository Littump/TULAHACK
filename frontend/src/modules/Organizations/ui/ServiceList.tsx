import {IServiceItem} from "@/modules/Services/types/ServicesTypes.ts";
import ServiceItem from "@/modules/Services/ui/ServiceItem.tsx";

interface Props{
    services:IServiceItem[];
}

const ServiceList = ({services}:Props) => {
    return (
        <div className="grid gap-12 grid-cols-3 w-full">
            {services.map(el=> <ServiceItem key={el.id} service={el}/>)}
        </div>
    );
};

export default ServiceList;
