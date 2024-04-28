import { INewsItem } from "@/modules/News/types/newsItem.ts";

import img from "@/assets/blank_post.webp";
import user from "@/assets/comment_ava.jpg";
import { useAddComment } from "@/modules/News/api/useAddComment.ts";
import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import Like from "@/modules/News/ui/Like.tsx";

interface CommentProps {
  name: string;
  text: string;
  date: string;
}
const Comment = ({ name, text }: CommentProps) => {
  return (
    <li className="flex gap-4 items-center bg-gray-50 py-2 px-4 rounded-xl">
      <div className="avatar placeholder">
        <div className="bg-primary text-white rounded-full w-12">
          <img src={user} alt="" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">{name}</span>
        <p>{text}</p>
      </div>
    </li>
  );
};

const NewsItemBody = ({
  text,
  title,
  address,
  image,
  id,
  created,
  comments,
  latitude,
  is_liked,
  likes,
  longitude,
}: INewsItem) => {
  const { mutate } = useAddComment();
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        if (values.text.length > 0) {
          mutate({ text: values.text, post: id });
          resetForm();
        }
      }}
      initialValues={{
        text: "",
      }}
    >
      {({}) => (
        <Form className="p-8 flex flex-col gap-8">
          <div className="flex gap-12 items-start">
            <div className="w-6/12">
              <img
                src={image ? image : img}
                alt=""
                className="rounded-xl h-64 w-full"
              />
            </div>
            <div className="w-7/12 flex flex-col gap-6">
              <span className="flex gap-4">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <Like id={id} isLiked={is_liked} likes={likes} />
              </span>
              <ul className="text-gray-600 flex gap-2 flex-col">
                <li>
                  <span className="text-primary">{created.slice(0, 10)}</span>
                </li>
                <li>
                  <span className="text-primary">Адрес:</span> {address}
                </li>
                <li>
                  <span className="text-primary">Описание:</span> {text}
                </li>
                <li>
                  <a
                    className="my-btn my-4"
                    target="_blank"
                    href={`https://yandex.ru/maps/?pt=${longitude},${latitude}&z=12&l=map`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    Посмотреть на карте
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <h2 className="text-2xl font-semibold">Комментарии</h2>
            <TextInput
              placeholder="Ответьте на пост:)"
              name="text"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              }
              isError={false}
            />
            <ul className="flex flex-col gap-4">
              {comments &&
                comments.map((el) => (
                  <Comment
                    text={el.text}
                    key={el.id}
                    name={el.user}
                    date={el.created}
                  />
                ))}
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewsItemBody;
