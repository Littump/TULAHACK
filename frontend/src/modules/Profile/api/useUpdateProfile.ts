import { useMutation } from "@tanstack/react-query";
import profileService from "@/modules/Profile/api/profileService.ts";
import UpdateMeDto from "@/modules/Profile/types/updateMe.dto.ts";
import { queryClient } from "@/main.tsx";

export const useUpdateMe = () =>
  useMutation({
    mutationFn: (body: UpdateMeDto) => profileService.updateMe(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
