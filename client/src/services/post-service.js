import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:3080/api/";

class PostService {
  submitPost(title, body) {
    return axios
      .post(
        "http://54.205.120.4:3080/api/forumposts",
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

  async submitImagePost(formData) {
    return axios
      .post("http://54.205.120.4:3080/api/forumposts/imagepost", formData, {
        headers: authHeader("yes"),
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  }

  async getPostsFromCurrentUser() {
    return axios
      .get("http://54.205.120.4:3080/api/forumposts/userposts", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  }

  deletePost(postID) {
    return axios
      .delete("http://54.205.120.4:3080/api/forumposts/delete/id=" + postID, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  }

  async getPost(postID) {
    var pk = postID.postID;
    return axios
      .get("http://54.205.120.4:3080/api/forumpost/" + pk)
      .then((response) => {
        console.log(response);
        return response;
      });
  }

  async loadPosts() {
    return axios
      .get("http://54.205.120.4:3080/api/forumposts")
      .then((response) => {
        console.log(response);
        return response.data;
      });
  }
}

export default new PostService();
