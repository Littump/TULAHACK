import user from "@/assets/user.png";
import { useNavigate } from "react-router-dom";
interface Props {
  title?: string;
}

const Navbar = ({ title }: Props) => {
  const navigate = useNavigate();
  const handleLeave = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const token = localStorage.getItem("token");
  return (
    <header
      className={`w-[100vw] bg-gray-50 z-10 flex justify-between items-center py-3 ${
        token && `pl-[22vw]`
      } pl-4 pr-8 fixed top-0 left-0 `}
    >
      <h3 className="text-xl">{title && title}</h3>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow flex flex-col gap-1 dropdown-content bg-base-100 rounded-box w-52"
        >
          <li className="w-full flex justify-start text-start">
            <button
              type="button"
              className="text-start w-full px-2 py-1 rounded-md text-violet-600 hover:bg-violet-50"
              onClick={handleLeave}
            >
              Выйти
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
