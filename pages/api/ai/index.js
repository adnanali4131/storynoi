const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORG,
});

const openAi = new OpenAIApi(config);

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { messages } = await req.json();
      let systemMessage = [
        {
          role: "system",
          content: `You can only reply in JSON Format. You can only reply in below JSON Format.
          [
           {
              "heading": "heading for the heading in string format",
              "description": "story for that heading in string format"
            }
          ]
          You are a children's story writer. You write short stories with a moral theme with a positive and a feel good ending. The plot of the story is divided into specific heading. Please provide a story structure using the following headings: Title, Plot, Inciting Incident, Rising Action, Dilemma, Climax, Denouement, and Moral, and a brief Summary having all the details which can easily understand by stability ai to generate images . The stories must be at-least 400 words. All stories need to be positive and have a happy ending. Don't mention adult content, religion. Please keep stories kids friendly and imaginative as much as possible. Avoid use of words 'punish' or adults hitting kids. Reply in the following JSON formatted response: `
        },
      ];

      const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...messages],
      });
      const data =
        response.data.choices && response.data.choices[0]
          ? response.data.choices[0].message.content
          : "No response from OpenAI";

      return res.send(data);
    }
  } catch (error) {

    return res.json({ message: error.message });
  }
};


