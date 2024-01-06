import axios from "axios";

// const Api = axios.create({ baseURL: "http://localhost:5000/api/v1" });
const Api = axios.create({ baseURL: "https://fedorain-api.onrender.com" });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signupUser = async (userData) =>
  await Api.post("/user/createuser", userData);
export const loginUser = async (userData) =>
  await Api.post("/user/getuser", userData);

export const createPost = async (postData) =>
  await Api.post("/post/createpost", postData);
export const getAllPosts = async () => await Api.get("/post/getposts");
export const getAllPostsOnly = async () => await Api.get("/post/getallposts");
export const getPostDetails = async (id) =>
  await Api.get(`/post/postdetails/${id}`);
export const createNewComment = async (comment, postId) =>
  await Api.post(`/post/${postId}/new_comment`, comment);

export const getpostComments = async (postId) =>
  await Api.get(`/post/all_comments/${postId}`);

export const getSearchPosts = async (searchText) =>
  await Api.get(`/post/search?searchtext=${searchText}`);
