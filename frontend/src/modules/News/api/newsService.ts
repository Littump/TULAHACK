import axios from "axios";
import API_URL from "@/config/api.ts";
import { AddNewsDto } from "@/modules/News/types/AddNews.dto.ts";
import { INewsItem } from "@/modules/News/types/newsItem.ts";
import { AddCommentDto } from "@/modules/News/types/AddComment.dto.ts";

class newsService {
  async addNews(body: AddNewsDto) {
    const form_data = new FormData();
    form_data.append("image", body.image, body.image.path);
    form_data.append("text", body.text);
    form_data.append("title", body.title);
    form_data.append("longitude", body.longitude.toString());
    form_data.append("latitude", body.latitude.toString());
    return axios.post(`${API_URL}posts/`, form_data, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getNews() {
    return axios.get<INewsItem[]>(`${API_URL}posts/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }

  async getPriorityNews() {
    return axios.get<INewsItem[]>(`${API_URL}posts/priority_list/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async addComment(body: AddCommentDto) {
    return axios.post<INewsItem[]>(`${API_URL}comments/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async pressLike(id: number) {
    return axios.post<INewsItem[]>(
      `${API_URL}posts/${id}/exchange_likes/`,
      {},
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      },
    );
  }
}

export default new newsService();
