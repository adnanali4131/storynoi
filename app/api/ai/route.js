const { Configuration, OpenAIApi } = require("openai");
import { NextResponse } from "next/server";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORG,
});

const openAi = new OpenAIApi(config);

export async function POST(req) {
  try {
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

    return new NextResponse(data);

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message });
  }
};


// const { Configuration, OpenAIApi } = require("openai");
// import { NextResponse } from 'next/server';

// const config = new Configuration({
//   apiKey: process.env.OPEN_AI_API_KEY,
//   organization: process.env.OPEN_AI_ORG,
// });

// const openAi = new OpenAIApi(config);

// export async function POST(req) {
//   try {
//     const { message, modify } = await req.json();

//     let prompt = [
//       {
//         role: "system",
//         content: `You can only reply in JSON Format. You can only reply in below JSON Format.
//         [
//          {
//             "heading": "heading for the heading in string format",
//             "description": "story for that heading in string format"
//           }
//         ]
//         You are a children's story writer. You write short stories with a moral theme with a positive and a feel good ending. The plot of the story is divided into specific heading. Please provide a story structure using the following headings: Title, Plot, Inciting Incident, Rising Action, Dilemma, Climax, Denouement, and Moral, and a brief Summary having all the details which can easily understand by stability ai to generate images . The stories must be at-least 400 words. All stories need to be positive and have a happy ending. Don't mention adult content, religion. Please keep stories kids friendly and imaginative as much as possible. Avoid use of words 'punish' or adults hitting kids. Reply in the following JSON formatted response:
//         `
//       },
//       { role: "user", content: message }
//     ];

//     let response = await openAi.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: prompt,
//     });

//     let data = response.data.choices && response.data.choices[0] ? response.data.choices[0].message.content : "No response from OpenAI";

//     if (modify) {
//       const modificationPrompt = [
//         { role: "user", content: message }
//       ];

//       const modificationResponse = await openAi.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: modificationPrompt,
//       });

//       data = modificationResponse.data.choices && modificationResponse.data.choices[0] ? modificationResponse.data.choices[0].message.content : "No modified response from OpenAI";
//     }

//     return new NextResponse(data);

//   } catch (error) {
//     return NextResponse.json({ message: "Error occurred" });
//   }
// };
