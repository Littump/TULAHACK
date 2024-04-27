import axios from "axios";
import API_URL from "@/config/api.ts";

import UpdateMeDto from "@/modules/Profile/types/updateMe.dto.ts";
import { IMyInfo } from "@/modules/Profile/types/myInfo.ts";

class profileService {
  async updateMe(body: UpdateMeDto) {
    return axios.patch(`${API_URL}users/me/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }

  async getMe() {
    return axios.get<IMyInfo>(`${API_URL}users/me/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new profileService();
