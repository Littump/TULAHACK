import { useGetChat } from "@/modules/Chat/api/useGetChat.ts";
import { useParams } from "react-router-dom";
import { IMessage } from "@/modules/Chat/types/types.ts";
import { useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import { useSendMessage } from "@/modules/Chat/api/useSendMessage.ts";
import { useGetMe } from "@/modules/Login/api/useGetMe.ts";

const Message = ({ text, created, user, my_id }: IMessage) => {
  return (
    <div className={`chat ${my_id === user ? "chat-end" : " chat-start"}`}>
      <div className="chat-header flex gap-2 flex-row-reverse">
        {user}
        <time className="text-xs opacity-50">{created.slice(0, 10)}</time>
      </div>
      <div className="chat-bubble chat-bubble-">{text}</div>
    </div>
  );
};

const Chat = () => {
  const { id } = useParams();
  if (!id) return;
  const { data: myData } = useGetMe();

  const { data, isPending } = useGetChat(+id);
  const { mutate, isPending: sendMessagePending } = useSendMessage(+id);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && messagesRef.current) {
      const lastItem = messagesRef.current.lastElementChild;
      if (lastItem) {
        lastItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [data]);

  if (!data || !myData || isPending)
    return (
      <div className="flex flex-col w-full bg-violet-50 rounded-3xl overflow-hidden ">
        <div className="bg-primary w-full h-20 flex justify-center items-center text-white"></div>
        <div className="flex gap-4 flex-col px-4 my-4 overflow-y-scroll h-[60vh]"></div>
      </div>
    );
  const handleSubmit = (text: string) => {
    mutate(text);
  };
  let messages = data.data.messages;
  const my_id = myData.data.id as number;

  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values.message);
        resetForm();
      }}
      initialValues={{ message: "" }}
    >
      {() => {
        return (
          <Form className="flex flex-col w-full bg-violet-50 rounded-3xl overflow-hidden ">
            <div className="bg-primary w-full h-20 flex justify-center items-center text-white">
              <h1 className="text-2xl font-bold">{data.data.you}</h1>
            </div>
            <div
              ref={messagesRef}
              className="flex gap-4 flex-col px-4 my-4 overflow-y-scroll h-[60vh]"
            >
              {[...messages].reverse().map((el) => (
                <Message {...el} my_id={my_id} key={el.id + "message"} />
              ))}
              {sendMessagePending && <div className="loading"></div>}
            </div>
            <div className="py-2 px-2">
              <TextInput
                placeholder="Сообщение"
                name="message"
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
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Chat;
