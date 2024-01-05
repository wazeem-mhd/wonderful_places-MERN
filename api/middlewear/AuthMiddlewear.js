import jwt from "jsonwebtoken";

const middleWear = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodeData = jwt.verify(token, "Wzm998@.com");

    if (!decodeData) {
      return res.json({ token_expire: true });
    }

    req.userId = decodeData.id;
    req.userName = decodeData.userName;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default middleWear;
