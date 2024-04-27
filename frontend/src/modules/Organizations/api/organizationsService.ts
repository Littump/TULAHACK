import axios from "axios";
import API_URL from "@/config/api.ts";
import { IOrganization } from "@/modules/Organizations/types/OrganizationTypes.ts";

class organizationsService {
  async getOrganizations() {
    return axios.get<IOrganization[]>(`${API_URL}users/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async addChat(id: number) {
    return axios.post(
      `${API_URL}chats/`,
      {
        company: id,
      },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      },
    );
  }
}

export default new organizationsService();
