import { NextResponse } from "next/server";

const engineId = process.env.ENGINE_ID;
const apiHost = process.env.API_HOST;
const apiKey = process.env.API_KEY;

export async function POST(req) {
  const { summary, description } = await req.json();

  try {
    const stabilityResponse = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `Context: ${summary}. Based on this context, create a visual representation of the following description: ${description}.`,
            },
          ],
          cfg_scale: 7,
          height: 512,
          width: 512,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (stabilityResponse.status === 429) {
      throw new Error(
        "Rate limit reached for Stability AI. Please try again later."
      );
    }

    const stabilityData = await stabilityResponse.json();
    const images = stabilityData;

    return NextResponse.json({ images });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
