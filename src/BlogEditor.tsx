import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  Code,
  Eraser,
  Eye,
  EyeOff,
  Type as FontSizeIcon,
  GripVertical,
  HelpCircle,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Minus,
  Paintbrush,
  PaintBucket,
  Pilcrow,
  Plus,
  Quote,
  Redo,
  Save,
  Sparkles,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Table as TableIcon,
  Type,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  autoSave?: boolean;
  onSave?: () => void;
}

const fontSizeOptions = [
  { label: '8pt - Très petit', value: '8px' },
  { label: '10pt - Petit', value: '10px' },
  { label: '12pt - Petit', value: '12px' },
  { label: '14pt - Normal', value: '14px' },
  { label: '16pt - Grand', value: '16px' },
  { label: '18pt - Grand', value: '18px' },
  { label: '20pt - Très grand', value: '20px' },
  { label: '24pt - Énorme', value: '24px' },
  { label: '32pt - Titre', value: '32px' },
  { label: '48pt - Affichage', value: '48px' },
];

const fontFamilyOptions = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
  { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS, cursive' },
];

const colorOptions = [
  { name: 'Noir', value: '#000000' },
  { name: 'Rouge', value: '#ef4444' },
  { name: 'Vert', value: '#22c55e' },
  { name: 'Bleu', value: '#3b82f6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Rose', value: '#ec4899' },
  { name: 'Jaune', value: '#fbbf24' },
  { name: 'Gris clair', value: '#9ca3af' },
  { name: 'Gris foncé', value: '#4b5563' },
  { name: 'Blanc', value: '#ffffff' },
];

const highlightColors = [
  { name: 'Jaune', value: '#fef3c7' },
  { name: 'Vert', value: '#d1fae5' },
  { name: 'Bleu', value: '#dbeafe' },
  { name: 'Rose', value: '#fce7f3' },
  { name: 'Orange', value: '#ffedd5' },
  { name: 'Violet', value: '#ede9fe' },
];

export function BlogEditor({
  content,
  onChange,
  placeholder = 'Commencez à écrire votre article...',
  autoSave = true,
  onSave,
}: BlogEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFormatting, setShowFormatting] = useState(true);
  const [lastSave, setLastSave] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState('16px');
  const [customColor, setCustomColor] = useState('#000000');
  const [lineHeight, setLineHeight] = useState('1.5');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        code: false,
        strike: false,
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
          class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
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

      // Calculer les statistiques
      const text = editor.getText();
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(words.length);
      setCharCount(text.length);

      // Auto-save
      if (autoSave) {
        const now = new Date();
        setLastSave(now.toLocaleTimeString());
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none min-h-[500px] p-6',
        style: `line-height: ${lineHeight};`,
      },
      handleKeyDown: (_, event) => {
        // Enter pour aller en ligne
        if (event.key === 'Enter' && !event.shiftKey) {
          // Comportement normal d'Enter
          return false;
        }

        // Ctrl+Enter pour un saut de ligne
        if (event.key === 'Enter' && event.ctrlKey) {
          editor?.chain().focus().setHardBreak().run();
          return true;
        }

        // Ctrl+B pour gras
        if (event.key === 'b' && event.ctrlKey) {
          event.preventDefault();
          editor?.chain().focus().toggleBold().run();
          return true;
        }

        // Ctrl+I pour italique
        if (event.key === 'i' && event.ctrlKey) {
          event.preventDefault();
          editor?.chain().focus().toggleItalic().run();
          return true;
        }

        // Ctrl+U pour souligné
        if (event.key === 'u' && event.ctrlKey) {
          event.preventDefault();
          editor?.chain().focus().toggleUnderline().run();
          return true;
        }

        return false;
      },
    },
  });

  // Effet pour mettre à jour les statistiques initiales
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

  const addImage = () => {
    const url = window.prompt("URL de l'image:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
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
    // Implémentation simplifiée du copier-coller de format
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
        className={`blog-editor-container border rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-50 m-0' : ''
        }`}
      >
        {/* En-tête avec statistiques et contrôles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {wordCount} mots
              </Badge>
              <Badge variant="outline" className="font-mono">
                {charCount} caractères
              </Badge>
              {lastSave && (
                <Badge variant="secondary" className="text-xs">
                  Sauvegardé: {lastSave}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={showFormatting}
                  onPressedChange={setShowFormatting}
                  className="h-8 w-8"
                >
                  {showFormatting ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                {showFormatting
                  ? 'Masquer le formatage'
                  : 'Afficher le formatage'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="h-8"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Sauvegarder
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sauvegarder (Ctrl+S)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="h-8"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFullscreen ? 'Quitter le plein écran' : 'Plein écran (F11)'}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {showFormatting && (
          <>
            {/* Barre d'outils principale - Style Word */}
            <div className="flex flex-wrap items-center gap-1 p-3 border-b bg-gradient-to-r from-blue-50 to-white">
              {/* Famille de police */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1">
                    <Type className="h-4 w-4" />
                    <span className="text-xs">Police</span>
                    <GripVertical className="h-3 w-3 ml-1 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {fontFamilyOptions.map((font) => (
                    <DropdownMenuItem
                      key={font.value}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .setMark('textStyle', { fontFamily: font.value })
                          .run()
                      }
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Taille de police */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1">
                    <FontSizeIcon className="h-4 w-4" />
                    <span className="text-xs">
                      {fontSize.replace('px', '')}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <div className="p-2">
                    <Slider
                      defaultValue={[16]}
                      min={8}
                      max={48}
                      step={1}
                      onValueChange={([value]) =>
                        handleSetFontSize(`${value}px`)
                      }
                    />
                  </div>
                  <DropdownMenuSeparator />
                  {fontSizeOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSetFontSize(option.value)}
                    >
                      <span style={{ fontSize: option.value }} className="mr-2">
                        Aa
                      </span>
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-6" />

              {/* Groupe de formatage */}
              <div className="flex items-center gap-0.5 border rounded-md p-0.5 bg-white">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('bold')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                      }
                      className="h-8 w-8 data-[state=on]:bg-blue-100"
                    >
                      <Bold className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Gras (Ctrl+B)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('italic')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      className="h-8 w-8 data-[state=on]:bg-blue-100"
                    >
                      <Italic className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Italique (Ctrl+I)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('underline')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleUnderline().run()
                      }
                      className="h-8 w-8 data-[state=on]:bg-blue-100"
                    >
                      <UnderlineIcon className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Souligné (Ctrl+U)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('strike')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleStrike().run()
                      }
                      className="h-8 w-8 data-[state=on]:bg-blue-100"
                    >
                      <Strikethrough className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Barré</TooltipContent>
                </Tooltip>

                <Separator orientation="vertical" className="h-6 mx-0.5" />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('superscript')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleSuperscript().run()
                      }
                      className="h-8 w-8 data-[state=on]:bg-blue-100"
                    >
                      <SuperscriptIcon className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Exposant</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('subscript')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleSubscript().run()
                      }
                      className="h-8 w-8 data-[state=on]:bg-blue-100"
                    >
                      <SubscriptIcon className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Indice</TooltipContent>
                </Tooltip>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Couleur de texte */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1">
                    <PaintBucket className="h-4 w-4" />
                    <div
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: customColor }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-4">
                    <Label>Couleur du texte</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          className="w-8 h-8 rounded-full border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleSetColor(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-color">
                        Couleur personnalisée
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="custom-color"
                          type="color"
                          value={customColor}
                          onChange={(e) => handleSetColor(e.target.value)}
                          className="h-10"
                        />
                        <Input
                          value={customColor}
                          onChange={(e) => handleSetColor(e.target.value)}
                          className="h-10 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Surlignage */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9">
                    <Highlighter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <Label>Surlignage</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {highlightColors.map((color) => (
                      <button
                        key={color.value}
                        className="w-8 h-8 rounded border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleSetHighlight(color.value)}
                        title={color.name}
                      />
                    ))}
                    <button
                      className="w-8 h-8 rounded border flex items-center justify-center"
                      onClick={() =>
                        editor.chain().focus().unsetHighlight().run()
                      }
                      title="Enlever le surlignage"
                    >
                      <Eraser className="h-4 w-4" />
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <Separator orientation="vertical" className="h-6" />

              {/* Alignement */}
              <div className="flex items-center gap-0.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive({ textAlign: 'left' })}
                      onPressedChange={() =>
                        editor.chain().focus().setTextAlign('left').run()
                      }
                      className="h-8 w-8"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Aligner à gauche</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive({ textAlign: 'center' })}
                      onPressedChange={() =>
                        editor.chain().focus().setTextAlign('center').run()
                      }
                      className="h-8 w-8"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Centrer</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive({ textAlign: 'right' })}
                      onPressedChange={() =>
                        editor.chain().focus().setTextAlign('right').run()
                      }
                      className="h-8 w-8"
                    >
                      <AlignRight className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Aligner à droite</TooltipContent>
                </Tooltip>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Listes et éléments */}
              <div className="flex items-center gap-0.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('bulletList')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      className="h-8 w-8"
                    >
                      <List className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Liste à puces</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('orderedList')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      className="h-8 w-8"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Liste numérotée</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      size="sm"
                      pressed={editor.isActive('taskList')}
                      onPressedChange={() =>
                        editor.chain().focus().toggleTaskList().run()
                      }
                      className="h-8 w-8"
                    >
                      <CheckSquare className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>Liste de tâches</TooltipContent>
                </Tooltip>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Boutons d'insertion */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addLink}
                    className="h-8"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insérer un lien</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                    className="h-8"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insérer une image</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={insertTable}
                    className="h-8"
                  >
                    <TableIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insérer un tableau</TooltipContent>
              </Tooltip>

              <Separator orientation="vertical" className="h-6" />

              {/* Outils avancés */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs">Plus</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                  >
                    <Quote className="h-4 w-4 mr-2" />
                    Citation
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => editor.chain().focus().toggleCode().run()}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      editor.chain().focus().setHorizontalRule().run()
                    }
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Ligne horizontale
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearFormatting}>
                    <Eraser className="h-4 w-4 mr-2" />
                    Effacer le formatage
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyFormatting}>
                    <Paintbrush className="h-4 w-4 mr-2" />
                    Copier le formatage
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSetLineHeight('1')}>
                    <Pilcrow className="h-4 w-4 mr-2" />
                    Interligne: Simple
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSetLineHeight('1.5')}>
                    <Pilcrow className="h-4 w-4 mr-2" />
                    Interligne: 1.5
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSetLineHeight('2')}>
                    <Pilcrow className="h-4 w-4 mr-2" />
                    Interligne: Double
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-6" />

              {/* Annuler/Rétablir */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="h-8"
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Annuler (Ctrl+Z)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="h-8"
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Rétablir (Ctrl+Y)</TooltipContent>
              </Tooltip>
            </div>

            {/* Menu flottant pour les titres */}
            <FloatingMenu
              editor={editor}
              className="flex flex-col gap-1 p-2 bg-white border rounded-lg shadow-xl"
            >
              <div className="text-xs font-medium text-gray-500 mb-1">
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
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  P
                </Button>
              </div>
            </FloatingMenu>

            {/* Menu bulle pour le formatage rapide */}
            <BubbleMenu
              editor={editor}
              className="flex gap-1 p-2 bg-white border rounded-lg shadow-xl"
            >
              <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className="h-8 w-8 data-[state=on]:bg-blue-100"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className="h-8 w-8 data-[state=on]:bg-blue-100"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive('underline')}
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                className="h-8 w-8 data-[state=on]:bg-blue-100"
              >
                <UnderlineIcon className="h-4 w-4" />
              </Toggle>
              <Button
                size="sm"
                variant="ghost"
                onClick={addLink}
                className="h-8"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearFormatting}
                className="h-8"
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </BubbleMenu>
          </>
        )}

        {/* Zone d'édition avec mise en page améliorée */}
        <div className="relative">
          <div className={`p-4 ${isFullscreen ? 'max-w-6xl mx-auto' : ''}`}>
            <EditorContent editor={editor} />
          </div>

          {/* Guide de ligne (optionnel) */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="h-full mx-auto" style={{ maxWidth: '800px' }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="border-t border-gray-100"
                  style={{ height: `${parseInt(lineHeight) * 24}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Barre de statut en bas */}
        <div className="flex flex-wrap items-center justify-between p-2 border-t bg-gray-50 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              Astuce: Utilisez Ctrl+Entrée pour un saut de ligne
            </span>
            <span>•</span>
            <span>Interligne: {lineHeight}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSetFontSize(`${parseInt(fontSize) - 1}px`)}
              disabled={parseInt(fontSize) <= 8}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="font-mono">{fontSize.replace('px', '')}px</span>
            <button
              onClick={() => handleSetFontSize(`${parseInt(fontSize) + 1}px`)}
              disabled={parseInt(fontSize) >= 48}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
