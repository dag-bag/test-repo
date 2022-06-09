// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
const sanityClient = require("@sanity/client");

export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  );
  const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-21",
    token: process.env.NEXT_SANITY_API_TOKEN,
    useCdn: true,
  };
  const client = sanityClient(config);
  let { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: _id,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Could't comment successfully", error });
  }
  console.log("Commited succesfully");
  return res
    .status(200)
    .json({ success: true, message: "Commited succesfully" });
}
