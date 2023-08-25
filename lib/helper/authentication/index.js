import prisma from "@/db";
import jwt from "jsonwebtoken";

const authenticationHelper = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user, 'user')
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.userId
      }
    });
    if (dbUser) {
      req.user = dbUser
      return dbUser
    }

    return null;
  } catch (err) {
    return null;
  }
};

export default authenticationHelper;
