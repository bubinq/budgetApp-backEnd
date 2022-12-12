import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) {
      res.status(401).json({ message: "User is not authenticated!" });
      return
    }
    jwt.verify(token, process.env.JWT_KEY, function (err, done) {
      if (err) {
        res.status(403).json({ message: "User is not authorized!" });
        return
      }
      req.user = done;
      next();
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({message: error.message})
  }
};
