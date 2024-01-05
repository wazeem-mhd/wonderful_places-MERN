import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  picture: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

export default mongoose.model.Users || mongoose.model("User", userSchema);
