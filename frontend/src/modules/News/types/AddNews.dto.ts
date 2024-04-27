import img from "@/assets/achievement3.png";
export interface AddNewsDto {
  title: string;
  text: string;
  latitude: number;
  longitude: number;
  image: typeof img;
}
