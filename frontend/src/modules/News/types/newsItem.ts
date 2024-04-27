import img from "@/assets/news_item1.png";
export interface INewsItem {
  address: string;
  created: string;
  id: number;
  image: typeof img | null;
  latitude: number;
  likes: number;
  is_liked: boolean;
  longitude: number;
  text: string;
  title: string;
  comments: IComment[];
}
interface IComment {
  text: string;
  user: string;
  created: string;
  id: number;
}
