import { useMutation } from "@tanstack/react-query";
import messengerService from "./messengerService.ts";
import { queryClient } from "@/main.tsx";

export const useSendMessage = (id: number) =>
  useMutation({
    mutationFn: (text: string) =>
      messengerService.sendMessage({ chat: id, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages" + id] });
    },
  });
