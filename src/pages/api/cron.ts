import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Do something with the request
  // ...
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return something
  res.status(200).json({ success: true });
}
