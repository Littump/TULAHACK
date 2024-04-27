import { useMutation } from "@tanstack/react-query";
import newsService from "@/modules/News/api/newsService.ts";
import { queryClient } from "@/main.tsx";

export const usePressLike = (id: number) =>
  useMutation({
    mutationFn: () => newsService.pressLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
