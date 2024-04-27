import axios from "axios";
import API_URL from "@/config/api.ts";
import RegistrationDto from "@/modules/Registration/types/registration.dto.ts";

class registrationService {
  async registration(body: RegistrationDto) {
    return axios.post(`${API_URL}users/`, body);
  }
}

export default new registrationService();
