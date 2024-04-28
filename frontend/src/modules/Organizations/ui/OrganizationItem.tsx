import { IOrganization } from "@/modules/Organizations/types/OrganizationTypes.ts";
import { useAddChat } from "@/modules/Organizations/api/useAddChat.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  organizationInfo: IOrganization;
}

const OrganizationItem = ({ organizationInfo }: Props) => {
  const { mutate, data, isPending, isError } = useAddChat();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isError && !isPending && data) navigate("/messenger/" + data?.data.id);
  }, [mutate, isPending, data]);
  return (
    <div className="py-6 px-8 rounded-xl text-start border border-gray-400 flex flex-col gap-2 w-full items-center justify-center">
      <h2 className="text-2xl font-semibold">{organizationInfo.name}</h2>
      <p>{organizationInfo.description}</p>
      <p>{organizationInfo.address}</p>
      <button
        className="my-btn w-full"
        onClick={() => mutate(organizationInfo.id)}
      >
        Обратиться
      </button>
    </div>
  );
};

export default OrganizationItem;
