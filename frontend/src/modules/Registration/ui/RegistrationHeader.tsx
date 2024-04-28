import loginHeader from "@/assets/loginHeader.png";
function RegistrationHeader() {
  return (
    <div className="rounded-xl relative bg-primary text-white h-24 px-4 font-medium justify-between flex w-full items-center">
      <h4 className="text-lg">Добро пожаловать на портал</h4>
      <img
        src={loginHeader}
        alt=""
        className=" absolute -top-7 w-36 -right-4"
      />
    </div>
  );
}

export default RegistrationHeader;
