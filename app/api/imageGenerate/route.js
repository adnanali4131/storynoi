import { NextResponse } from 'next/server'

const engineId = process.env.ENGINE_ID
const apiHost = process.env.API_HOST
const apiKey = process.env.API_KEY


export async function POST(req) {
  const images = [];
  const sections = ["Title:"];

  let stabilityResponse;
  for (const section of sections) {
    const chunk = chunks.find(chunk => chunk.startsWith(section));
    if (chunk) {
      await sleep(10000);

      try {
        stabilityResponse = await fetch(
          `${apiHost}/v1/generation/${engineId}/text-to-image`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              text_prompts: [
                {
                  text: chunk
                },
              ],
              cfg_scale: 7,
              height: 1024,
              width: 1024,
              steps: 30,
              samples: 1,
            }),
          }
        )
      } catch (error) {
        await sleep(1000);
        continue;
      }

      if (stabilityResponse.status === 429) {
        await sleep(1000);
        continue;
      }


      const stabilityData = await stabilityResponse.json();
      images.push(stabilityData);



    }
  }

}
