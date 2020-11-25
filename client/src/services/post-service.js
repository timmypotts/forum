import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class PostService {
  submitPost(title, body) {
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

  async getPostsFromCurrentUser() {
    return axios
      .get(API_URL + "forumposts/userposts", { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }

  deletePost(postID) {
    return axios
      .delete(API_URL + "forumposts/delete/id=" + postID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  }

  async getPost(postID) {
    var pk = postID.postID;
    return axios.get(API_URL + "forumpost/" + pk).then((response) => {
      console.log(response);
      return response;
    });
  }

  async loadPosts() {
    return axios.get(API_URL + "forumposts").then((response) => {
      console.log(response);
      return response.data;
    });
  }
}

export default new PostService();
