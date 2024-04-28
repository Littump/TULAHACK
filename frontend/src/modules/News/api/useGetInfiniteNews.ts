import { useInfiniteQuery } from "@tanstack/react-query";

import API_URL from "@/config/api.ts";

import { INewsItem } from "@/modules/News/types/newsItem.ts";
const MAX_POST_PAGE = 3;
const getInfiniteScroll = async (page: number) => {
  const response = await fetch(
    `${API_URL}posts/?offset=${
      page === 0 ? 0 : (page - 1) * MAX_POST_PAGE
    }&limit=${MAX_POST_PAGE}`,

    {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    },
  );
  let news = await response.json();
  news = news.results;
  return news as INewsItem[];
};

export const useGetInfiniteNews = () =>
  useInfiniteQuery({
    queryKey: ["news"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getInfiniteScroll(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length ? allPages?.length + 1 : undefined;
    },
  });
