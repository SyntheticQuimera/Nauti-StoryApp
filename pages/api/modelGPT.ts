// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

type Data = {
  content: string | undefined
}
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt } = JSON.parse(req.body)
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  })
  const content = await response.data.choices[0].message?.content

  res.status(200).json({ content })
}
// 



