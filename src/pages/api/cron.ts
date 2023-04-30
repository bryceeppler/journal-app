import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { type JSONContent } from "@tiptap/react";
const extractTextFromNodes = (nodes: JSONContent[]): string => {
  let extractedText = "";

  nodes.forEach((node) => {
    if (node.type === "text") {
      extractedText += (node.text as string) + " ";
    } else if (node.content) {
      extractedText += extractTextFromNodes(node.content);
    }
  });

  return extractedText;
};

const convertToLongString = (content: JSONContent): string => {
  if (!content.content) {
    return "";
  }

  const extractedText = extractTextFromNodes(content.content).trim();

  return extractedText;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Do something with the request
  // ...
  // fetch user using prisma
  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      authorId: "",
    },
    take: 3,
  });

  //   since journalEntry bodies are in json, we need to parse them to get the text
  for (let i = 0; i < journalEntries.length; i++) {
    const journalEntry = journalEntries[i];
    const content = journalEntry?.body
      ? (JSON.parse(journalEntry.body as string) as JSONContent)
      : null;
    const longString = convertToLongString(content as JSONContent);
    console.log(longString);
  }

  // Return something
  res.status(200).json({ success: true });
}
