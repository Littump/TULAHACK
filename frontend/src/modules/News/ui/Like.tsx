import { usePressLike } from "@/modules/News/api/usePressLike.ts";

interface Props {
  likes: number;
  isLiked: boolean;
  id: number;
}
const Like = ({ likes, isLiked, id }: Props) => {
  const { mutate } = usePressLike(id);
  return (
    <button type="button" className="cursor-pointer" onClick={() => mutate()}>
      <span
        className={`flex h-min w-min space-x-1 items-center rounded-full ${
          isLiked
            ? "text-rose-600 bg-rose-50 hover:text-rose-400"
            : "text-gray-400 hover:text-rose-600 hover:bg-rose-50"
        }  py-1 px-2 text-xs font-medium`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current hover:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <p className="font-semibold text-xs">{likes}</p>
      </span>
    </button>
  );
};

export default Like;
