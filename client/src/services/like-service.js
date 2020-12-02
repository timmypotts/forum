import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:3080/api/";

class LikeService {
  async likePost(postID) {
    return axios
      .post("/api/likepost/id=" + postID, {}, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async unlikePost(postID) {
    return axios
      .delete("/api/unlikepost/id=" + postID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async likeComment(commentID) {
    return axios
      .post("/api/likecomment/id=" + commentID, {}, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async unlikeComment(commentID) {
    return axios
      .delete("/api/unlikecomment/id=" + commentID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new LikeService();
