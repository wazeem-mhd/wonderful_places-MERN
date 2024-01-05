import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  location: String,
  creatorName: String,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// const Post = mongoose.model("Post", postSchema);

export default mongoose.model.Posts || mongoose.model("Post", postSchema);
