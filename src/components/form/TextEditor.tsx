import { EditorContent, useEditor, Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import Color from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback, useEffect, useState } from "react";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useField } from "formik";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Code,
  Highlighter,
  ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Minus,
  Palette,
  Quote,
  Redo,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface MenuBarProps {
  editor: Editor | null;
}

interface TextEditorProps {
  name: string;
  label: string;
  placeholder?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Toolbar Button Component
const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      "p-2 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
      isActive && "bg-gray-400 text-white"
    )}
  >
    {children}
  </button>
);

// Dropdown Component
const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-300"
      >
        {trigger}
        <ChevronDown size={14} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 z-20 mt-1 bg-white border rounded-md shadow-lg min-w-30">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

// Link Modal Component
interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  initialUrl?: string;
}

const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialUrl = "",
}) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
        <form>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onClose();
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Image Modal Component
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, alt: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(url, alt);
    setUrl("");
    setAlt("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Image description"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onClose();
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Color Picker Component
interface ColorPickerProps {
  editor: Editor;
  type: "text" | "highlight";
}

const ColorPicker: React.FC<ColorPickerProps> = ({ editor, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#efefef",
    "#f3f3f3",
    "#ffffff",
    "#980000",
    "#ff0000",
    "#ff9900",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
    "#e6b8af",
    "#f4cccc",
    "#fce5cd",
    "#fff2cc",
    "#d9ead3",
    "#d0e0e3",
    "#c9daf8",
    "#cfe2f3",
    "#d9d2e9",
    "#ead1dc",
  ];

  const handleColorChange = (color: string) => {
    if (type === "text") {
      editor.chain().focus().setColor(color).run();
    } else {
      editor.chain().focus().toggleHighlight({ color }).run();
    }
    setIsOpen(false);
  };

  const handleRemoveColor = () => {
    if (type === "text") {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().unsetHighlight().run();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-gray-300"
        title={type === "text" ? "Text Color" : "Highlight Color"}
      >
        {type === "text" ? <Palette size={18} /> : <Highlighter size={18} />}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 z-20 mt-1 bg-white border rounded-md shadow-lg p-2 w-55">
            <div className="grid grid-cols-10 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className="w-5 h-5 rounded border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleRemoveColor}
              className="w-full mt-2 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Remove {type === "text" ? "Color" : "Highlight"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Divider Component
const Divider = () => <div className="w-px h-6 bg-gray-400 mx-1" />;

// Menu Bar Component
const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [headingDropdown, setHeadingDropdown] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const setLink = useCallback(
    (url: string) => {
      if (!editor) return;

      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    [editor]
  );

  const addImage = useCallback(
    (url: string, alt: string) => {
      if (!editor) return;
      editor.chain().focus().setImage({ src: url, alt }).run();
    },
    [editor]
  );

  if (!editor) return null;

  const getCurrentHeading = () => {
    if (editor.isActive("heading", { level: 1 })) return "H1";
    if (editor.isActive("heading", { level: 2 })) return "H2";
    if (editor.isActive("heading", { level: 3 })) return "H3";
    if (editor.isActive("heading", { level: 4 })) return "H4";
    if (editor.isActive("heading", { level: 5 })) return "H5";
    if (editor.isActive("heading", { level: 6 })) return "H6";
    return "Normal";
  };

  return (
    <>
      <div className="bg-[#E3E8EF] px-3 py-2 rounded-t-xl">
        <div className="flex flex-wrap items-center gap-1">
          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo size={18} />
          </ToolbarButton>

          <Divider />

          {/* Heading Dropdown */}
          <Dropdown
            trigger={
              <span className="text-sm min-w-15">{getCurrentHeading()}</span>
            }
            isOpen={headingDropdown}
            setIsOpen={setHeadingDropdown}
          >
            <div className="py-1">
              <button
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-base"
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setHeadingDropdown(false);
                }}
              >
                Normal
              </button>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={cn(
                    "w-full px-4 py-2 text-left hover:bg-gray-100",
                    level === 1 && "text-2xl font-bold",
                    level === 2 && "text-xl font-bold",
                    level === 3 && "text-lg font-semibold",
                    level === 4 && "text-base font-semibold",
                    level === 5 && "text-sm font-medium",
                    level === 6 && "text-xs font-medium"
                  )}
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .setHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                      .run();
                    setHeadingDropdown(false);
                  }}
                >
                  Heading {level}
                </button>
              ))}
            </div>
          </Dropdown>

          <Divider />

          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            title="Inline Code"
          >
            <Code size={18} />
          </ToolbarButton>

          <Divider />

          {/* Subscript/Superscript */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            isActive={editor.isActive("subscript")}
            title="Subscript"
          >
            <SubscriptIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            isActive={editor.isActive("superscript")}
            title="Superscript"
          >
            <SuperscriptIcon size={18} />
          </ToolbarButton>

          <Divider />

          {/* Colors */}
          <ColorPicker editor={editor} type="text" />
          <ColorPicker editor={editor} type="highlight" />

          <Divider />

          {/* Text Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify size={18} />
          </ToolbarButton>

          <Divider />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>

          <Divider />

          {/* Blockquote */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote size={18} />
          </ToolbarButton>

          {/* Horizontal Rule */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus size={18} />
          </ToolbarButton>

          <Divider />

          {/* Link */}
          <ToolbarButton
            onClick={() => {
              // const previousUrl = editor.getAttributes("link").href || "";
              setLinkModalOpen(true);
            }}
            isActive={editor.isActive("link")}
            title="Insert Link"
          >
            <Link2 size={18} />
          </ToolbarButton>
          {editor.isActive("link") && (
            <ToolbarButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Remove Link"
            >
              <Link2Off size={18} />
            </ToolbarButton>
          )}

          {/* Image */}
          <ToolbarButton
            onClick={() => setImageModalOpen(true)}
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </ToolbarButton>
        </div>
      </div>

      {/* Link Modal */}
      <LinkModal
        isOpen={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        onSubmit={setLink}
        initialUrl={editor.getAttributes("link").href || ""}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onSubmit={addImage}
      />
    </>
  );
};

// Bubble Menu Component (appears when text is selected)
const EditorBubbleMenu: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  const setLink = useCallback(
    (url: string) => {
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    [editor]
  );

  return (
    <>
      <BubbleMenu
        editor={editor}
        options={{ placement: "bottom", offset: 8, flip: true }}
        // tippyOptions={{ duration: 100 }}
        className="bg-white shadow-lg rounded-lg border flex items-center gap-1 p-1"
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough size={16} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton
          onClick={() => setLinkModalOpen(true)}
          isActive={editor.isActive("link")}
        >
          <Link2 size={16} />
        </ToolbarButton>
        {editor.isActive("link") && (
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Link2Off size={16} />
          </ToolbarButton>
        )}
      </BubbleMenu>

      <LinkModal
        isOpen={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        onSubmit={setLink}
        initialUrl={editor.getAttributes("link").href || ""}
      />
    </>
  );
};

// Main Text Editor Component
const TextEditor: React.FC<TextEditorProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Color,
      TextStyle,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer hover:text-blue-700",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing...",
      }),
      Subscript,
      Superscript,
    ],
    content: field?.value,
    editorProps: {
      attributes: {
        spellcheck: "false",
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] p-4",
      },
    },
    onUpdate: ({ editor }: { editor: Editor }) => {
      helpers.setValue(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && field.value !== editor.getHTML()) {
      editor.commands.setContent(field.value || "", { emitUpdate: false });
    }
  }, [field.value, editor]);

  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={name}
        className="text-primary-900 typography-regular-small font-medium"
      >
        {label}
      </label>
      <div className="border border-[#E3E8EF] rounded-xl overflow-y-auto overflow-x-hidden">
        <MenuBar editor={editor} />
        <div className="relative">
          {editor && <EditorBubbleMenu editor={editor} />}
          <EditorContent editor={editor} />
        </div>
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default TextEditor;
