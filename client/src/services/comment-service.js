import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class CommentService {
  async getComments(postID) {
    postID = postID.postID;
    return axios
      .get(API_URL + "comment/fetch-all/postID=" + postID)
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  }

  async submitComment(postID, commentText) {
    postID = postID.postID;
    return axios
      .post(
        API_URL + "comment/postID=" + postID,
        { commentText },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }
}

export default new CommentService();
