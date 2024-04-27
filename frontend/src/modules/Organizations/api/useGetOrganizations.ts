import { useQuery } from "@tanstack/react-query";
import organizationsService from "@/modules/Organizations/api/organizationsService.ts";

export const useGetOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationsService.getOrganizations(),
  });
