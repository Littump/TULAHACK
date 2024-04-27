import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/modules/Navbar";
import Registration from "@/modules/Registration";

function LoginPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);
  return (
    <div>
      <Navbar title="Регистрация" />
      <Registration />
    </div>
  );
}

export default LoginPage;
