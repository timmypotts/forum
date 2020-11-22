import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class LikeService {
  async likePost(postID) {
    return axios
      .post(API_URL + "likepost/id=" + postID, {}, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async unlikePost(postID) {
    return axios
      .delete(API_URL + "unlikepost/id=" + postID, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new LikeService();
