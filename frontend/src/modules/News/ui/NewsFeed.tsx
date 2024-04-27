import NewsItem from "@/modules/News/ui/NewsItem.tsx";
import { useCallback, useMemo, useRef } from "react";
import { useGetInfiniteNews } from "@/modules/News/api/useGetInfiniteNews.ts";

const NewsFeed = () => {
  const observer = useRef<IntersectionObserver>();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetInfiniteNews();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const news = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  if (error) return <h1>Ошибка</h1>;
  return (
    <div className="grid grid-cols-3 gap-10 my-6 ">
      {news &&
        news.map((item) => (
          <div key={item.id} ref={lastElementRef}>
            <NewsItem {...item}></NewsItem>
          </div>
        ))}
      {isFetching && <div>Загрузка...</div>}
    </div>
  );
};

export default NewsFeed;
