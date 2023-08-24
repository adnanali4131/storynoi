import prisma from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function resetPasswordHandler(req, res) {
  try {
    if (req.method === "POST") {
      const { token, newPassword } = req.body;
      console.log("New Password:", newPassword);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: decoded.userId },
        data: { password: hashedPassword },
      });

      return res.json({ message: "Password has been reset successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
