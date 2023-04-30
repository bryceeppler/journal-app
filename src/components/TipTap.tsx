"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

const Tiptap = () => {
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
            class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg p-5 focus:outline-none bg-base-200 rounded-lg border border-base-300 w-full max-w-4xl',

        }
    },
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>a journal entry</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. We offer a few.
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or more list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>

      <blockquote>
        Wow, that’s amazing. Good work! 👏
        <br />
        — Mom
      </blockquote>
    `,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
