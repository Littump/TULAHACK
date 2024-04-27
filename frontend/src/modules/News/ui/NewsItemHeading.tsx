import { INewsItem } from "@/modules/News/types/newsItem.ts";
import img from "@/assets/blank_post.webp";

const NewsItemHeading = ({ image }: INewsItem) => {
  return (
    <div className="w-72">
      <img
        src={image ? image : img}
        alt=""
        className="rounded-xl h-48 w-full"
      />
    </div>
  );
};

export default NewsItemHeading;
