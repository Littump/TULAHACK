import { ReactNode } from "react";
import Sidebar from "@/modules/Sidebar";
import Navbar from "@/modules/Navbar";
import Bot from "@/modules/bot";

interface Props {
  children: ReactNode;
  title?: string;
}

function MainLayout({ children, title }: Props) {
  const token = localStorage.getItem("token");

  return (
    <div className="w-full flex flex-col min-h-[100vh] bg-gray-50 items-center ">
      {token && <Sidebar />}
      <div
        className={`${
          token && "pl-[22vw]"
        } w-full mx-auto flex flex-col items-center justify-center mt-20 `}
      >
        <Navbar title={title} />
        <div className="w-full h-full rounded-xl bg-white p-6">{children}</div>
      </div>
      <Bot />
    </div>
  );
}

export default MainLayout;
