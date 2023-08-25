import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email, password } = JSON.parse(req.body);

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          userName: user.firstName + " " + user.lastName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.json({ token });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
