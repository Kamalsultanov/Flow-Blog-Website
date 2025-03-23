import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { FaCode } from "react-icons/fa";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";
import { FaListOl } from "react-icons/fa";
import { TbBlockquote } from "react-icons/tb";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="  bg-matte p-3  text-white">
      <label className="">Add Content</label>
      <div className="px-2 py-1 flex flex-wrap gap-2 items-center font-sans">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold") ? "is-active" : ""
          } font-bold font-sans `}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic") ? "is-active" : ""
          } italic font-serif px-2 `}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${
            editor.isActive("strike") ? "is-active" : ""
          } line-through`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <FaCode />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${
            editor.isActive("paragraph") ? "is-active" : ""
          } font-bold`}
        >
          P
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <TbBlockquote />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <LuUndo2 />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <LuRedo2 />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const customStyles = `
.ProseMirror {
  min-height: 100px !important;
  padding: 16px;
  border-radius: 4px 5px 0 0;
}
`;

const EditorComponent = ({ value, onChange }) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <section className=" border border-matte  ">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={value || ""}
        onUpdate={({ editor }) => {
          const html = editor.getHTML();
          if (onChange) {
            onChange(html);
          }
        }}
      />
    </section>
  );
};

export default EditorComponent;
