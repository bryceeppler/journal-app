"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

import dayjs from "dayjs";
interface TiptapProps {
  onUpdate: (content: JSONContent) => void;
}
const Tiptap: React.FC<TiptapProps> = ({ onUpdate }) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      //   TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg p-5 focus:outline-none bg-base-200 rounded-lg border border-base-300 w-full max-w-4xl",
      },
    },
    content: `
      <h2>${dayjs().format("dddd, MMM DD")}</h2>
      <p>Start writing your journal entry here...</p>
    `,
  });
  useEffect(() => {
    if (!editor) return;

    const updateContent = () => {
      onUpdate(editor.getJSON());
    };

    editor.on("transaction", updateContent);
    return () => {
      editor.off("transaction", updateContent);
    };
  }, [editor, onUpdate]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
