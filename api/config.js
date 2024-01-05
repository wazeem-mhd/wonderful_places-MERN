import mongoose from "mongoose";

const Configuration = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("MongoDb connected successfully"))
    .catch((error) => console.log(error.message));
};

export default Configuration;
