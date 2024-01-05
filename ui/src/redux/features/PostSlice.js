import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  getPostDetails,
  createNewComment,
  getpostComments,
  getSearchPosts,
  getAllPostsOnly,
} from "../Api";

export const allPostsOnly = createAsyncThunk("/post/getposts", async () => {
  try {
    const { data } = await getAllPostsOnly();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error.message);
  }
});
export const createNewPost = createAsyncThunk(
  "/post/create",
  async (values) => {
    try {
      const result = await createPost(values);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getPosts = createAsyncThunk("/post/get", async () => {
  try {
    const { data } = await getAllPosts();
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export const postdetails = createAsyncThunk("/post/details", async (id) => {
  try {
    // console.log(id);
    const response = await getPostDetails(id);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postsBySearch = createAsyncThunk("/post/search", async (value) => {
  try {
    const { data: response } = await getSearchPosts(value);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
});

export const createComment = createAsyncThunk(
  "/post/newcomment",
  async (comment, postId) => {
    try {
      console.log(comment);
      const response = await createNewComment({ comment }, postId);
      console.log(response.data);
      // return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postComments = createAsyncThunk(
  "/post/allcomments",
  async (postId) => {
    try {
      const response = await getpostComments(postId);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    message: "",
    loading: false,
    posts: [],
    allPosts: [],
    post: {},
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(createNewPost.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postdetails.pending, (state) => {
        state.loading = true;
        state.post = {};
        state.message = "";
      })
      .addCase(postdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
        state.message = action.payload.message;
      })
      .addCase(postdetails.rejected, (state) => {
        state.loading = false;
        state.post = {};
        state.message = "";
      });

    builder
      .addCase(postComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(postComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(postComments.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postsBySearch.pending, (state) => {
        state.loading = true;
        state.message = "";
      })
      .addCase(postsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.message = action.payload.message;
      })
      .addCase(postsBySearch.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(allPostsOnly.pending, (state) => {
        state.loading = true;
      })
      .addCase(allPostsOnly.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(allPostsOnly.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default postSlice.reducer;
