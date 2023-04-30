import React from "react";

type Props = object;
type Suggestion = {
  type: string;
  msg: string;
};

const promptSuggestions: Suggestion[] = [
  {
    type: "prompt-gratitude",
    msg: "What are you grateful for?",
  },
  {
    type: "prompt-achievement",
    msg: "What have you achieved today?",
  },
  {
    type: "prompt-lesson",
    msg: "What have you learned today?",
  },
];

const actionSuggestions: Suggestion[] = [
  {
    type: "action-reflect",
    msg: "Reflect on your day",
  },
  {
    type: "action-plan",
    msg: "Plan your day",
  },
  {
    type: "action-visualize",
    msg: "Visualize your day",
  },
];

export default function JournalRecommendations({}: Props) {
  return (
    <div className="rounded border border-accent p-4">
      <div className="text-sm font-bold">Prompts</div>
      {promptSuggestions.map((suggestion) => (
        <div key={suggestion.type} className="rounded p-3 text-xs">
          <h3>{suggestion.msg}</h3>
        </div>
      ))}
      <div className="text-sm font-bold">Actions</div>
      {actionSuggestions.map((suggestion) => (
        <div key={suggestion.type} className="rounded p-3 text-xs">
          <h3>{suggestion.msg}</h3>
        </div>
      ))}
    </div>
  );
}
