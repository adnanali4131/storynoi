import client from "@/lib/storage/index";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  const { heading, base64, id } = JSON.parse(req.body);
  const imageBuffer = Buffer.from(base64, "base64");

  if (req.method === "POST") {
    try {
      const imageKey = `${Date.now()}-${heading}.png`;
      await client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Body: imageBuffer,
          Key: imageKey,
          ContentType: "image/png",
        })
      );
      const imageUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;
      const story = await prisma.story.findFirst({
        where: {
          id,
        },
      });
      if (story) {
        let imageUrls = setImageUrlArray(story.imageUrl, {
          heading,
          url: imageUrl,
        });
        await prisma.story.update({
          where: {
            id,
          },
          data: {
            imageUrl: imageUrls,
          },
        });
      }

      return res.status(200).json({
        heading,
        url: imageUrl,
      });
    } catch (err) {
      console.log({ err });
      return res.status(400).json({ message: err.message });
    }
  }
}

function setImageUrlArray(imageUrls = [], urlObj) {
  let urlArray = [...imageUrls];
  if (imageUrls.find((el) => el.heading === urlObj.heading)) {
    urlArray = imageUrls.map((el) =>
      el.heading === urlObj.heading ? urlObj : el
    );
  } else urlArray.push(urlObj);
  return urlArray;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Set desired value here
    },
  },
};
