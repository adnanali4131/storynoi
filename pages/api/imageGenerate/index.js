import STYLES from "@/utils/enums";

const engineId = process.env.ENGINE_ID;
const apiHost = process.env.API_HOST;
const apiKey = process.env.API_KEY;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { summary, description, style } = req.body;

    try {
      let requestBody = {
        text_prompts: [
          {
            text: `Context: ${summary}. Based on this context, create a visual representation of the following description: ${description}.`,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      };

      if (style && Object.values(STYLES).includes(style)) {
        requestBody.style_preset = style;
      } else if (style) {
        return res.json({
          status: 400,
          message: "Invalid style provided."
        });
      }

      const stabilityResponse = await fetch(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (stabilityResponse.status === 429) {
        throw new Error(
          "Rate limit reached for Stability AI. Please try again later."
        );
      }

      const stabilityData = await stabilityResponse.json();
      const images = stabilityData;

      return res.json({ images });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: error.message || "Internal Server Error",
      });
    }
  }
}