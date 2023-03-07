// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const cloudinary = require('cloudinary').v2;

type Data = {
  image: any
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
  const { image } = JSON.parse(req.body)
  const results = await cloudinary.uploader.upload(image, {
    detection: "coco_v1",
    auto_tagging: .6
  })
  res.status(200).json(results)
}




