import jwt from "jsonwebtoken";

const authenticationHelper = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    return user;
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticationHelper;
