import React, { useMemo, useState } from "react";
import { type Descendant, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { deserialize, serialize } from "./markdownUtils";
import { type Node } from "slate";
interface SlateMarkdownEditorProps {
  value: string;
  onChange: (content: string) => void;
  backgroundColor: string;
  textColor: string;
}

const SlateMarkdownEditor: React.FC<SlateMarkdownEditorProps> = ({
  value,
  onChange,
  textColor,
  backgroundColor,
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [nodes, setNodes] = useState(deserialize(value));

  const handleChange = (newNodes: Node[]) => {
    setNodes(newNodes);
    onChange(serialize(newNodes));
  };

  return (
    <Slate
      editor={editor}
      value={nodes as Descendant[]}
      onChange={handleChange}
    >
      <Editable
        className={`w-full max-w-2xl rounded-md bg-slate-600 p-4 text-white`}
      />
    </Slate>
  );
};

export default SlateMarkdownEditor;
