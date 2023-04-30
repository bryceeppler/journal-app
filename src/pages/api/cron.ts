import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { type JSONContent } from "@tiptap/react";
import { type AxiosResponse } from "axios";
import {
  Configuration,
  type CreateCompletionResponse,
  OpenAIApi,
} from "openai";

const openai = new OpenAIApi();
type Suggestion = {
  msg: string;
  type: "actionable" | "journal_prompt";
};

const parseSuggestions = (response: CreateCompletionResponse): Suggestion[] => {
  console.log(response);
  const text = response.choices[0]?.text?.trim() || "";
  const lines = text.split("\n");

  const suggestions: Suggestion[] = [];

  let currentType: "actionable" | "journal_prompt" | null = null;

  for (const line of lines) {
    if (line.startsWith("// Actionable Suggestions")) {
      currentType = "actionable";
    } else if (line.startsWith("// Journal Prompts")) {
      currentType = "journal_prompt";
    } else if (currentType && line.match(/^\d+\./)) {
      suggestions.push({
        msg: line.replace(/^\d+\.\s*/, ""),
        type: currentType,
      });
    }
  }

  return suggestions;
};

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

const convertToLongString = (content: JSONContent | null): string => {
  if (!content || !content.content) {
    return "";
  }

  const extractedText = extractTextFromNodes(content.content).trim();

  return extractedText;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  // Do something with the request
  // ...
  // fetch user using prisma
  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      authorId: "user_2P9Et4EPoTGZpE8khifpPLgYyw8",
    },
    take: 3,
  });

  const journalEntryStrings = journalEntries.map((journalEntry) => {
    const content = journalEntry?.body
      ? (JSON.parse(journalEntry.body as string) as JSONContent)
      : null;
    const longString = convertToLongString(content as JSONContent);
    return longString;
  });

  const persona =
    "Male, fit, 25 years old, software engineer, motivated, career-oriented";
  const journalEntryTemplate = journalEntryStrings.join("\n");

  const prompt = `Using a user persona and their three most recent personal journal entries, generate 3 actionable suggestions they can perform during their day and 3 journal prompts they could include in their journal.

// Persona
${persona}

// Journal entries
${journalEntryTemplate}
`;

  try {
    const openaiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 100,
    });

    // take the response and save it to the database as a "Suggestion"
    const suggestions = parseSuggestions(openaiResponse.data);
    console.log("suggestions", suggestions);

    // save suggestions to the database
    const suggestionPromises = suggestions.map((suggestion) => {
      return prisma.suggestion.create({
        data: {
          msg: suggestion.msg,
          type: suggestion.type,
          userId: "user_2P9Et4EPoTGZpE8khifpPLgYyw8",
        },
      });
    });

    await Promise.all(suggestionPromises);

    res.status(200).json({ success: true, data: openaiResponse.data });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ success: false, error: "Error calling OpenAI API" });
  }
}
