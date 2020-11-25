import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class CommentService {
  async getComments(postID) {
    postID = postID.postID;
    return axios
      .get(API_URL + "comment/fetch-all/postID=" + postID)
      .then((response) => {
        return response.data;
      });
  }

  async submitComment(postID, commentText) {
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

  async deleteComment(commentID) {
    return axios
      .delete(API_URL + "comment/delete/" + commentID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  }

  async getCommentsFromCurrentUser() {
    return axios
      .get(API_URL + "comment/usercomments", { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }
}

export default new CommentService();
