// src/presentation/components/chapter/RichTextEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link2,
  Undo,
  Redo,
  Pilcrow,
} from "lucide-react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded p-1.5 transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800",
        disabled && "opacity-30 cursor-not-allowed",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  disabled,
  error,
  placeholder = "Mulai menulis konten chapter...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value ?? "",
    editable: !disabled,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (!value) return;

    const currentContent = editor.getHTML();
    if (currentContent !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const setLink = () => {
    const url = window.prompt("Masukkan URL:");
    if (!url || !editor) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        Konten Chapter <span className="text-red-500">*</span>
      </label>

      <div
        className={cn(
          "rounded-xl border bg-white overflow-hidden",
          error ? "border-red-400" : "border-gray-300",
          disabled && "opacity-60",
        )}
      >
        {!disabled && (
          <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
            <ToolbarButton
              title="Paragraph"
              onClick={() => editor.chain().focus().setParagraph().run()}
              active={editor.isActive("paragraph")}
            >
              <Pilcrow size={15} />
            </ToolbarButton>

            <ToolbarButton
              title="Heading 2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor.isActive("heading", { level: 2 })}
            >
              <Heading2 size={15} />
            </ToolbarButton>

            <ToolbarButton
              title="Heading 3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor.isActive("heading", { level: 3 })}
            >
              <Heading3 size={15} />
            </ToolbarButton>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <ToolbarButton
              title="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
            >
              <Bold size={15} />
            </ToolbarButton>

            <ToolbarButton
              title="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
            >
              <Italic size={15} />
            </ToolbarButton>

            <ToolbarButton
              title="Link"
              onClick={setLink}
              active={editor.isActive("link")}
            >
              <Link2 size={15} />
            </ToolbarButton>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <ToolbarButton
              title="Bullet List"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
            >
              <List size={15} />
            </ToolbarButton>

            <ToolbarButton
              title="Numbered List"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
            >
              <ListOrdered size={15} />
            </ToolbarButton>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <ToolbarButton
              title="Undo"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo size={15} />
            </ToolbarButton>

            <ToolbarButton
              title="Redo"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo size={15} />
            </ToolbarButton>
          </div>
        )}

        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm max-w-none px-4 py-3 min-h-[280px]",
            "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[260px]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
          )}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
