import { sendEmail } from "@/aws/ses";
import prisma from "@/db";
import jwt from "jsonwebtoken";

export default async function forgotPasswordHandler(req, res) {
  try {
    if (req.method === "POST") {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const subject = "Reset Password";
      const htmlTemplate = `
              <p>Click on the link below to reset your password:</p>
              <a href="${`${process.env.RESET_URL}?token=${token}`}">Reset Password</a>
            `;

      await sendEmail({
        recipientEmail: user.email,
        subject: subject,
        htmlTemplate: htmlTemplate
      });

      return res.json({ message: "Reset password link has been sent to your email" });
    }

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

