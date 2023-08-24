
export default async function forgotPasswordHandler(req, res) {
  try {
    if (req.method === "POST") {
      const { email } = JSON.parse(req.body);

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



      return res.json({ message: "Reset password link has been sent to your email" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}


export default async function resetPasswordHandler(req, res) {
  try {
    if (req.method === "POST") {
      const { token, newPassword } = JSON.parse(req.body);


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
