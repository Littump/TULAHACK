import { useMutation } from "@tanstack/react-query";
import newsService from "@/modules/News/api/newsService.ts";
import { queryClient } from "@/main.tsx";
import { AddCommentDto } from "@/modules/News/types/AddComment.dto.ts";

export const useAddComment = () =>
  useMutation({
    mutationFn: (body: AddCommentDto) => newsService.addComment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
