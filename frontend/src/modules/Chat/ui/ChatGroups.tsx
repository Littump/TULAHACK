import { NavLink, Outlet } from "react-router-dom";
import { useGetChats } from "@/modules/Chat/api/useGetChats.ts";
import { IMessage } from "@/modules/Chat/types/types.ts";
import user from "@/assets/user.png";
interface ChatGroupProps {
  lastMessage: IMessage | null;
  name: string;
  id: number;
}

const ChatGroup = ({ lastMessage, name, id }: ChatGroupProps) => {
  return (
    <NavLink
      to={id.toString()}
      className={({ isActive }) =>
        !isActive
          ? "w-full relative transition-all hover:bg-violet-50 py-3 px-4 flex justify-start gap-4 items-start border border-violet-300 hover:border-primary rounded-xl"
          : "w-full relative transition-all bg-violet-50 py-3 px-4 flex justify-start gap-4 items-start border border-primary rounded-xl"
      }
    >
      <img src={user} alt="" className="w-14 h-14" />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl text-primary">{name}</h1>
        {lastMessage ? <p>{lastMessage.text}</p> : <p>Начните диалог!</p>}
      </div>
      {lastMessage && (
        <span className="text-xs text-gray-400 absolute top-2 right-2">
          {lastMessage.created.slice(0, 10)}
        </span>
      )}
    </NavLink>
  );
};

const ChatGroups = () => {
  const { data, isPending } = useGetChats();
  if (!data || isPending) return <div className="loading"></div>;
  return (
    <div className="flex gap-8 h-[78vh]">
      <div className="w-6/12 flex flex-col gap-4">
        {data.data.map((el) => (
          <ChatGroup
            key={el.id + "group"}
            id={el.id}
            name={el.you}
            lastMessage={
              el.messages.length > 0
                ? el.messages[el.messages.length - 1]
                : null
            }
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default ChatGroups;
