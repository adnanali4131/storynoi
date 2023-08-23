import authenticateJWT from "@/middleware";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { title } = JSON.parse(req.body);
      const user = req.user;
      let storyId;
      if (user) {
        const story = await prisma.story.create({
          data: {
            title: title,
            userId: req.user.userId,
            userPrompt: title,
            imageUrl: [],
          },
        });
        storyId = story.id;
      }

      return res.status(200).json({ id: storyId });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export default authenticateJWT(handler);
