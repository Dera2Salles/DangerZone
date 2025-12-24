import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  Code,
  Eraser,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Paintbrush,
  PaintBucket,
  Pilcrow,
  Quote,
  Sparkles,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Table as TableIcon,
  Type,
  Underline as UnderlineIcon,
  GripVertical,
  Type as FontSizeIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface ToolbarProps {
  editor: Editor;
  fontSize: string;
  customColor: string;
  onSetFontSize: (size: string) => void;
  onSetColor: (color: string) => void;
  onAddLink: () => void;
  onAddImage: () => void;
  onInsertTable: () => void;
  onClearFormatting: () => void;
  onCopyFormatting: () => void;
  onSetHighlight: (color: string) => void;
  onSetLineHeight: (height: string) => void;
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

export function Toolbar({
  editor,
  fontSize,
  customColor,
  onSetFontSize,
  onSetColor,
  onAddLink,
  onAddImage,
  onInsertTable,
  onClearFormatting,
  onCopyFormatting,
  onSetHighlight,
  onSetLineHeight,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 p-3 border-b bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
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

      {/* Taille de police - AJOUTÉ */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 gap-1">
            <FontSizeIcon className="h-4 w-4" />
            <span className="text-xs">{fontSize.replace('px', '')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <div className="p-2">
            <Slider
              defaultValue={[parseInt(fontSize)]}
              min={8}
              max={48}
              step={1}
              onValueChange={([value]) => onSetFontSize(`${value}px`)}
            />
          </div>
          <DropdownMenuSeparator />
          {fontSizeOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSetFontSize(option.value)}
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
      <div className="flex items-center gap-0.5 border rounded-md p-0.5 bg-white dark:bg-gray-800">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive('bold')}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
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
              onPressedChange={() => editor.chain().focus().toggleItalic().run()}
              className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
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
              onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
              className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
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
              onPressedChange={() => editor.chain().focus().toggleStrike().run()}
              className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
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
              onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
              className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
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
              onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
              className="h-8 w-8 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900"
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
                  onClick={() => onSetColor(color.value)}
                  title={color.name}
                />
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-color">Couleur personnalisée</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-color"
                  type="color"
                  value={customColor}
                  onChange={(e) => onSetColor(e.target.value)}
                  className="h-10"
                />
                <Input
                  value={customColor}
                  onChange={(e) => onSetColor(e.target.value)}
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
                onClick={() => onSetHighlight(color.value)}
                title={color.name}
              />
            ))}
            <button
              className="w-8 h-8 rounded border flex items-center justify-center"
              onClick={() => editor.chain().focus().unsetHighlight().run()}
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
              onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
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
              onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
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
              onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
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
              onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
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
              onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
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
              onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
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
            onClick={onAddLink}
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
            onClick={onAddImage}
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
            onClick={onInsertTable}
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
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
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
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus className="h-4 w-4 mr-2" />
            Ligne horizontale
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onClearFormatting}>
            <Eraser className="h-4 w-4 mr-2" />
            Effacer le formatage
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopyFormatting}>
            <Paintbrush className="h-4 w-4 mr-2" />
            Copier le formatage
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onSetLineHeight('1')}>
            <Pilcrow className="h-4 w-4 mr-2" />
            Interligne: Simple
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSetLineHeight('1.5')}>
            <Pilcrow className="h-4 w-4 mr-2" />
            Interligne: 1.5
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSetLineHeight('2')}>
            <Pilcrow className="h-4 w-4 mr-2" />
            Interligne: Double
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
