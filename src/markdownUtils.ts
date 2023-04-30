import { Node } from "slate";

const deserialize = (markdown: string): Node[] => {
  const lines = markdown.split("\n");
  return lines.map((line) => {
    return {
      type: "paragraph",
      children: [{ text: line }],
    };
  });
};

const serialize = (nodes: Node[]): string => {
  return nodes.map((node) => Node.string(node)).join("\n");
};

export { deserialize, serialize };
