'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TableKit } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';

import { EditorMenus } from './EditorMenus';
import { Header } from './Header';
import { StatusBar } from './StatusBar';
import { ThemeProvider, useTheme } from './ThemeContext';
import { Toolbar } from './Toolbar';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  autoSave?: boolean;
  onSave?: () => void;
  onImageUpload?: (file: File) => Promise<string>;
}

function BlogEditorContent({
  content,
  onChange,
  placeholder = 'Commencez à écrire votre article...',
  autoSave = true,
  onSave,
  onImageUpload,
}: BlogEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFormatting, setShowFormatting] = useState(true);
  const [lastSave, setLastSave] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState('16px');
  const [customColor, setCustomColor] = useState('#000000');
  const [lineHeight, setLineHeight] = useState('1.5');
  const { theme } = useTheme();
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        code: false,
      }),
      TextStyle,
      Color,
      Underline,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
          rel: 'noopener noreferrer',
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex items-start my-2',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      TableKit.configure({
        table: { resizable: true },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      const text = editor.getText();
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(words.length);
      setCharCount(text.length);

      if (autoSave) {
        const now = new Date();
        setLastSave(now.toLocaleTimeString());
      }
    },
    editorProps: {
      attributes: {
        class: `prose prose-lg focus:outline-none min-h-[500px] p-6 dark:prose-invert ${
          theme === 'dark' ? 'dark' : ''
        }`,
        style: `line-height: ${lineHeight};`,
      },
      handleKeyDown: (_, event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          return false;
        }

        if (event.key === 'Enter' && event.ctrlKey) {
          editor?.chain().focus().setHardBreak().run();
          return true;
        }

        if (event.key === 'b' && event.ctrlKey) {
          event.preventDefault();
          editor?.chain().focus().toggleBold().run();
          return true;
        }

        if (event.key === 'i' && event.ctrlKey) {
          event.preventDefault();
          editor?.chain().focus().toggleItalic().run();
          return true;
        }

        if (event.key === 'u' && event.ctrlKey) {
          event.preventDefault();
          editor?.chain().focus().toggleUnderline().run();
          return true;
        }

        if (event.key === 'k' && event.ctrlKey) {
          event.preventDefault();
          addLink();
          return true;
        }

        if (event.key === 's' && event.ctrlKey) {
          event.preventDefault();
          handleSave();
          return true;
        }

        return false;
      },
    },
  });

  useEffect(() => {
    if (editor) {
      const text = editor.getText();
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(words.length);
      setCharCount(text.length);
    }
  }, [editor]);

  if (!editor) return null;

  const handleSetFontSize = (size: string) => {
    setFontSize(size);
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
  };

  const handleSetColor = (color: string) => {
    setCustomColor(color);
    editor.chain().focus().setColor(color).run();
  };

  const handleSetHighlight = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  const handleSetLineHeight = (height: string) => {
    setLineHeight(height);
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt("Entrez l'URL:", previousUrl ?? 'https://');

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: fullUrl })
      .run();
  };

  const addImage = async (file?: File) => {
    if (file) {
      setIsUploading(true);
      try {
        let imageUrl: string;
        
        if (onImageUpload) {
          imageUrl = await onImageUpload(file);
        } else {
          imageUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
        
        editor?.chain().focus().setImage({ 
          src: imageUrl,
          alt: file.name,
          title: file.name 
        }).run();
        
      } catch (error) {
        console.error('Erreur lors du chargement de l\'image:', error);
        alert('Erreur lors du chargement de l\'image');
      } finally {
        setIsUploading(false);
      }
    } else {
      const url = window.prompt("URL de l'image (optionnel):");
      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
      }
    }
  };

  const insertTable = () => {
    const rows = parseInt(prompt('Nombre de lignes:') || '3');
    const cols = parseInt(prompt('Nombre de colonnes:') || '3');

    if (rows && cols) {
      editor
        .chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow: true })
        .run();
    }
  };

  const clearFormatting = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  const copyFormatting = () => {
    const marks = editor.getAttributes('textStyle');
    alert(`Format copié: ${JSON.stringify(marks)}`);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    const element = document.querySelector('.blog-editor-container');
    if (element) {
      if (!isFullscreen) {
        element.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    const now = new Date();
    setLastSave(now.toLocaleTimeString());
  };

  return (
    <TooltipProvider>
      <div
        className={`blog-editor-container border rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-50 m-0' : ''
        }`}
      >
        <Header
          wordCount={wordCount}
          charCount={charCount}
          lastSave={lastSave}
          showFormatting={showFormatting}
          isFullscreen={isFullscreen}
          onToggleFormatting={() => setShowFormatting(!showFormatting)}
          onSave={handleSave}
          onToggleFullscreen={toggleFullscreen}
        />

        {showFormatting && (
          <>
            <Toolbar
              editor={editor}
              fontSize={fontSize}
              customColor={customColor}
              onSetFontSize={handleSetFontSize}
              onSetColor={handleSetColor}
              onAddLink={addLink}
              onAddImage={addImage}
              onInsertTable={insertTable}
              onClearFormatting={clearFormatting}
              onCopyFormatting={copyFormatting}
              onSetHighlight={handleSetHighlight}
              onSetLineHeight={handleSetLineHeight}
            />
            <EditorMenus
              editor={editor}
              onAddLink={addLink}
              onClearFormatting={clearFormatting} onAddImage={function (): void {
                throw new Error('Function not implemented.');
              } }            />
          </>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Chargement de l'image...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Veuillez patienter
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <div className={`p-4 ${isFullscreen ? 'max-w-6xl mx-auto' : ''}`}>
            <EditorContent editor={editor} />
          </div>

          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="h-full mx-auto" style={{ maxWidth: '800px' }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="border-t border-gray-100 dark:border-gray-800"
                  style={{ height: `${parseInt(lineHeight) * 24}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        <StatusBar
          lineHeight={lineHeight}
          fontSize={fontSize}
          onDecreaseFont={() => handleSetFontSize(`${parseInt(fontSize) - 1}px`)}
          onIncreaseFont={() => handleSetFontSize(`${parseInt(fontSize) + 1}px`)}
          canDecrease={parseInt(fontSize) <= 8}
          canIncrease={parseInt(fontSize) >= 48}
        />
      </div>
    </TooltipProvider>
  );
}

export function BlogEditor(props: BlogEditorProps) {
  return (
    <ThemeProvider>
      <BlogEditorContent {...props} />
    </ThemeProvider>
  );
}
