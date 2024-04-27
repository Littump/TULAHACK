import Modal from "@/ui/Modal.tsx";
import NewsItemHeading from "@/modules/News/ui/NewsItemHeading.tsx";
import NewsItemBody from "@/modules/News/ui/NewsItemBody.tsx";
import { useState } from "react";
import { INewsItem } from "@/modules/News/types/newsItem.ts";
import Like from "@/modules/News/ui/Like.tsx";

const NewsItem = (news: INewsItem) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, created, is_liked, id, likes } = news;
  return (
    <article className="w-72 flex items-start text-start flex-col gap-1 ">
      <Modal
        className="w-[800px] overflow-y-scroll max-h-[85vh]"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        heading={<NewsItemHeading {...news} />}
      >
        <NewsItemBody {...news} />
      </Modal>
      <div className="flex items-start justify-between w-full mt-2">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-gray-400">{created.slice(0, 10)}</p>
        </div>
        <Like id={id} isLiked={is_liked} likes={likes} />
      </div>
    </article>
  );
};

export default NewsItem;
