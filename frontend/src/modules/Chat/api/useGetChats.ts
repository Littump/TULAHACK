import { useQuery } from "@tanstack/react-query";
import messengerService from "./messengerService.ts";

export const useGetChats = () =>
  useQuery({
    queryKey: ["chats"],
    queryFn: () => messengerService.getChats(),
  });
