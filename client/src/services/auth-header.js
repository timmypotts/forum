export default function authHeader(addOn) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token && addOn) {
    // for Node.js Express back-end
    return {
      "Content-Type": "multipart/form-data",
      authorization: "Bearer " + user.token,
    };
  } else if (user && user.token) {
    return { authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
