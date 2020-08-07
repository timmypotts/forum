import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class PostService {
  submitPost(title, body) {
    console.log(authHeader());
    return axios
      .post(
        API_URL + "forumposts",
        {
          title,
          body,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  }

  async loadPosts() {
    return axios.get(API_URL + "forumposts").then((response) => {
      return response.data;
    });
  }
}

export default new PostService();
