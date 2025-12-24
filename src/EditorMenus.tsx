import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import {
  Bold,
  Eraser,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  Underline as UnderlineIcon,
} from 'lucide-react';

interface EditorMenusProps {
  editor: Editor;
  onAddLink: () => void;
  onAddImage: () => void;
  onClearFormatting: () => void;
}

export function EditorMenus({
  editor,
  onAddLink,
  onAddImage,
  onClearFormatting,
}: EditorMenusProps) {
  return (
    <>
      <FloatingMenu
        editor={editor}
        className="flex flex-col gap-1 p-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl"
      >
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Insérer
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className="text-lg font-bold"
          >
            H1
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="text-base font-bold"
          >
            H2
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </Button>
          <Button size="sm" variant="ghost" onClick={onAddImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </FloatingMenu>

      <BubbleMenu
        editor={editor}
        className="flex gap-1 p-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl"
      >
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>
        <Button size="sm" variant="ghost" onClick={onAddLink} className="h-8">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClearFormatting}
          className="h-8"
        >
          <Eraser className="h-4 w-4" />
        </Button>
      </BubbleMenu>
    </>
  );
}
