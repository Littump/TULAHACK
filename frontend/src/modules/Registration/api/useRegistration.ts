import { useMutation } from "@tanstack/react-query";
import loginService from "./registrationService.ts";
import RegistrationDto from "@/modules/Registration/types/registration.dto.ts";

export const useRegistration = () =>
  useMutation({
    mutationFn: (body: RegistrationDto) => loginService.registration(body),
  });
