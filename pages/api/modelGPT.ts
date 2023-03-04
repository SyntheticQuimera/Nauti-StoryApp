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



