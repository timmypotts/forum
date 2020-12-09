import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:3080/api/";

class CommentService {
  async getComments(postID) {
    postID = postID.postID;
    return axios
      .get("http://54.205.120.4:3080/api/comment/fetch-all/postID=" + postID)
      .then((response) => {
        return response.data;
      });
  }

  async submitComment(postID, commentText) {
    return axios
      .post(
        "http://54.205.120.4:3080/api/comment/postID=" + postID,
        { commentText },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }

  async deleteComment(commentID) {
    return axios
      .delete("http://54.205.120.4:3080/api/comment/delete/" + commentID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  }

  async getCommentsFromCurrentUser() {
    return axios
      .get("http://54.205.120.4:3080/api/comment/usercomments", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  }
}

export default new CommentService();
