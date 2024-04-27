import axios from "axios";
import API_URL from "@/config/api.ts";
import SendMessageDto from "@/modules/Chat/types/sendMessage.dto.ts";
import { IChat } from "@/modules/Chat/types/types.ts";

class messengerService {
  async sendMessage(body: SendMessageDto) {
    return axios.post(`${API_URL}messages/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }

  async getChats() {
    return axios.get<IChat[]>(`${API_URL}chats/me/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getChat(id: number) {
    return axios.get<IChat>(`${API_URL}chats/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new messengerService();
