import { IOrganization } from "@/modules/Organizations/types/OrganizationTypes.ts";
import OrganizationItem from "@/modules/Organizations/ui/OrganizationItem.tsx";

interface Props {
  organizations: IOrganization[];
}

const OrganizationsList = ({ organizations }: Props) => {
  return (
    <div className="grid gap-12 grid-cols-2 w-full">
      {organizations.map((el) => (
        <OrganizationItem key={el.id + "orga"} organizationInfo={el} />
      ))}
    </div>
  );
};

export default OrganizationsList;
