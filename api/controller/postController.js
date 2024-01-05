import mongoose from "mongoose";
import Post from "../model/postModel.js";
import User from "../model/userModel.js";
import Comment from "../model/comments.js";

export const createPost = async (req, res) => {
  const request = req.body;

  // console.log(request);
  try {
    const postUser = await User.findOne({ _id: req.userId });
    const newPost = new Post({
      ...request,
      creatorId: req.userId,
      creatorName: req.userName,
      createdAt: new Date().toISOString(),
    });

    await newPost.save();

    postUser.posts.push(newPost);
    await postUser.save();

    res.status(201).send(newPost);
  } catch (error) {
    // console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    // not get this posts into single post Details
    // const allPost = await Post.find().populate("comments");
    const allPost = await Post.find();

    res.status(200).send(allPost);
  } catch (error) {
    // console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getAllPostsOnly = async (req, res) => {
  try {
    const allPost = await Post.find().populate("comments");
    res.status(200).send(allPost);
  } catch (error) {
    // console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// export const getPostUser = async (req, res) => {
//   const { creator } = req.params;
//   // console.log(creator);
//   try {
//     const result = await User.findById(creator).;
//     res.status(200).send(result.userName);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getSearchText = async (req, res) => {
  const { searchtext } = req.query;
  // console.log(searchtext);
  try {
    const text = new RegExp(searchtext, "i");
    const searchResult = await Post.find({
      $or: [{ title: text }, { tags: text }],
    }).exec();

    // const Result = await Post.find({
    //   $or: [{ title: /searchtext/i }, { tags: /searchtext/i }],
    // }).exec();

    // console.log(searchResult);
    if (searchResult) {
      return res.status(200).json({ posts: searchResult, message: "" });
    } else {
      return res.status(404).json({ posts: {}, message: "Results not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  // console.log(postId);
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "unouthorized user" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(postId);

    if (post) {
      const user = await post.likes.findIndex(
        (id) => id === String(req.userId)
      );

      if (user === -1) {
        post.likes.push(req.userId);
      } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      }

      const updatePost = await Post.findByIdAndUpdate(postId, post, {
        new: true,
      });
      // console.log(updatePost);
      res.status(200).json({ result: updatePost });
    } else {
      return res.status(404).send("The Id has no Post");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const request = req.body;
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "unouthorized user" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: "Invalid post id" });
    }

    const modifyPost = await Post.findByIdAndUpdate(postId, request, {
      new: true,
    });

    res.status(200).json({ result: modifyPost });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "unouthorized user" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: "Invalid post id" });
    }
    await Post.findByIdAndRemove(id);
    res.status(200).send("Post Deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostDetails = async (req, res) => {
  const postId = req.params.id;
  // console.log(postId);
  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.json({ message: "Invalid Post Id", post: {} });
    }
    const post = await Post.findById(postId).populate("comments");

    console.log(post);
    if (post === null) {
      res.json({ message: "Invalid Post Id", post: {} });
    }

    const response = {
      title: post.title,
      description: post.description,
      location: post.location,
      creatorName: post.creatorName,
      tags: post.tags,
      selectedFile: post.selectedFile,
      likes: post.likes,
      comments: post.comments,
      createdAt: post.createdAt,
    };

    res.status(200).json({ message: "", post: response });
  } catch (error) {
    console.log(error.message);
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.post_id;
    const userId = req.userId;
    const userName = req.userName;
    const newComment = req.body;

    const currentPost = await Post.findOne({ _id: postId });

    // if (mongoose.Types.ObjectId.isValid(postId)) {
    //   console.log("success");
    // }

    const result = await Comment.create({
      userName,
      userId: userId,
      postId,
      comment: newComment.comment,
    });

    currentPost.comments.push(result);
    currentPost.save();

    return res.status(201).send(result);
  } catch (error) {
    console.log(error.message);
  }
};

// export const getAllComment = async (req, res) => {
//   try {
//     const postId = req.params.post_id;

//     const postComments = await Comment.find({ postId });

//     const result = [];

//     for (const singleComment of postComments) {
//       const { userName } = await User.findOne({ _id: singleComment.userId });
//       // console.log(userName);
//       result.push({ userName, comment: singleComment.comment });
//     }

// let result = await Promise.all(postComments.map(commentdetails));

// async function commentdetails(postComment) {
//   const { userName } = await User.findOne({ _id: postComment.userId });
//   return { userName, comment: postComment.comment };
// }

//     return res.status(200).send(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const userPosts = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({ message: "Invalid Post Id" });
    }

    const userPosts = await User.findById(userId).populate({
      path: "posts",
      model: "Post",
      populate: {
        path: "comments",
        model: "Comment",
        select: ["userName", "comment"],
      },
    });
    // const userPosts = posts.filter((post) => post.creator === String(userId));
    res.status(200).json({ result: userPosts });
  } catch (error) {
    console.log(error.message);
  }
};
