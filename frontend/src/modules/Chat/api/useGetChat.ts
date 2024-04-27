import { useQuery } from "@tanstack/react-query";
import messengerService from "./messengerService.ts";

export const useGetChat = (id: number) =>
  useQuery({
    queryKey: ["messages" + id],
    queryFn: () => messengerService.getChat(id),
    refetchInterval: 1000,
  });
