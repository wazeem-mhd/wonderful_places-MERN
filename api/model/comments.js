import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  userName: {
    type: String,
  },
  comment: String,
});

export default mongoose.model.Comments ||
  mongoose.model("Comment", commentSchema);
