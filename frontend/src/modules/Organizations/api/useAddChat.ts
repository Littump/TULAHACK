import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main.tsx";
import organizationsService from "@/modules/Organizations/api/organizationsService.ts";

export const useAddChat = () =>
  useMutation({
    mutationFn: (id: number) => organizationsService.addChat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
