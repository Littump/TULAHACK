import { useQuery } from "@tanstack/react-query";
import profileService from "@/modules/Profile/api/profileService.ts";

export const useGetProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getMe(),
  });
