// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const cloudinary = require('cloudinary').v2;

type Data = {

}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const results = await cloudinary.api.tags({

    max_results: 50
  })
  res.status(200).json(results)
}




