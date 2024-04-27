import RegistrationHeader from "@/modules/Registration/ui/RegistrationHeader.tsx";
import RegistrationForm from "@/modules/Registration/ui/RegistrationForm.tsx";

const Registration = () => {
  return (
    <div className="flex gap-4 flex-col mt-4 w-4/12 mx-auto">
      <RegistrationHeader />
      <RegistrationForm />
    </div>
  );
};

export default Registration;
