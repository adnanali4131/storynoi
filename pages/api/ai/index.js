import authenticateJWT from "@/middleware";
const { Configuration, OpenAIApi } = require("openai");
import authenticationHelper from "@/lib/helper/authentication";
import prisma from "@/db";
import isEmpty from "@/lib/helper/isEmpty";


const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORG,
});

const openAi = new OpenAIApi(config);

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { messages, id } = JSON.parse(req.body);
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
        You are a children's story writer. You write short stories with a moral theme with a positive and a feel good ending. The plot of the story is divided into specific heading. Please provide a story structure using the following headings: Title (heading key should be "Title" followed by description key to be title string), Plot, Inciting Incident, Rising Action, Dilemma, Climax, Denouement, Moral and Discussions (three bullet point in array formate these bullets add on index number of array and should be in question formate),  and a brief Summary having all the details which can easily understand by stability ai to generate images . The stories must be at-least 400 words. All stories need to be positive and have a happy ending. Don't mention adult content, religion.Please keep stories kids friendly and imaginative as much as possible.Avoid use of words 'punish' or adults hitting kids.Reply in the following JSON formatted response: `,
        },
      ];

      const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages: [...systemMessage, ...messages],
      });
      const data =
        response.data.choices && response.data.choices[0]
          ? response.data.choices[0].message.content
          : "No response from OpenAI";

      let parsedData = JSON.parse(data);
      if (parsedData && parsedData.data) {
        parsedData = parsedData.data;
      }

      const titleObj =
        parsedData && parsedData.find((item) => item.heading === "Title");
      const title = titleObj ? titleObj.description : null;
      let storyId = id;
      let user = await authenticationHelper(req);

      let story;
      if (!user && id === "null" && id === null) {
        story = {
          title: title,
          userPrompt: title,
          imageUrl: [],
        };
      }

      if ((title && !isEmpty(user)) || (title && !isEmpty(id))) {
        if (!id) {
          story = await prisma.story.create({
            data: {
              title: title,
              userId: req.user.userId,
              userPrompt: title,
              imageUrl: [],
            },
          });
          storyId = story.id;
        } else {
          story = await prisma.story.update({
            where: {
              id,
            },
            data: {
              title: title,
              userPrompt: title,
            },
          });
        }
      }

      return res.status(200).json({ data: parsedData, id: storyId, story });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export default handler;
