import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:3080/api/";

class LikeService {
  async likePost(postID) {
    return axios
      .post(
        "http://54.205.120.4:3080/api/likepost/id=" + postID,
        {},
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  async unlikePost(postID) {
    return axios
      .delete("http://54.205.120.4:3080/api/unlikepost/id=" + postID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async likeComment(commentID) {
    return axios
      .post(
        "http://54.205.120.4:3080/api/likecomment/id=" + commentID,
        {},
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  async unlikeComment(commentID) {
    return axios
      .delete("http://54.205.120.4:3080/api/unlikecomment/id=" + commentID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new LikeService();
