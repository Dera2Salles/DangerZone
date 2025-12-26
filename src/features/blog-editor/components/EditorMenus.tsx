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
        className="flex flex-col gap-1 p-2 bg-popover border dark:border-brand-primary/30 rounded-lg shadow-xl"
      >
        <div className="text-xs font-medium text-brand-secondary dark:text-brand-mint/60 mb-1">
          Insérer
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className="text-lg font-bold text-brand-primary-dark dark:text-brand-mint"
          >
            H1
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="text-base font-bold text-brand-primary-dark dark:text-brand-mint"
          >
            H2
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className="font-bold text-brand-primary-dark dark:text-brand-mint"
          >
            H3
          </Button>
          <Button size="sm" variant="ghost" onClick={onAddImage} className="text-brand-primary dark:text-brand-primary-light">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </FloatingMenu>

      <BubbleMenu
        editor={editor}
        className="flex gap-1 p-2 bg-popover border dark:border-brand-primary/30 rounded-lg shadow-xl"
      >
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 data-[state=on]:bg-primary/10 dark:data-[state=on]:bg-primary/50"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 data-[state=on]:bg-primary/10 dark:data-[state=on]:bg-primary/50"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          className="h-8 w-8 data-[state=on]:bg-primary/10 dark:data-[state=on]:bg-primary/50"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>
        <Button size="sm" variant="ghost" onClick={onAddLink} className="h-8 text-brand-primary dark:text-brand-primary-light">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClearFormatting}
          className="h-8 text-brand-secondary"
        >
          <Eraser className="h-4 w-4" />
        </Button>
      </BubbleMenu>
    </>
  );
}
