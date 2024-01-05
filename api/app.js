import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConfig from "./config.js";
import authRoute from "./router/authRouter.js";
import postRoute from "./router/postRouter.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use("/api/v1/user", authRoute);
app.use("/api/v1/post", postRoute);

const startServer = function () {
  dbConfig(CONNECTION_URL);
  app.listen(PORT, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Server running on port ${PORT}`);
    }
  });
};
startServer();
