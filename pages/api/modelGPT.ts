// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  content: string | undefined;
};
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt } = (await JSON.parse(req.body)) || {};
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant who can create stories in different literary genres based on the information provided to you. They must be written as if they had been written by a human, with all the moral, ethical and problematic implications of the real world, a literary depth as if it were a best seller.",
      },
      { role: "user", content: prompt },
    ],
  });

  res.status(200).json({ content: response.data.choices[0].message?.content });
}
//
