import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, EyeOff, Maximize2, Minimize2, Moon, Save, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface HeaderProps {
  wordCount: number;
  charCount: number;
  lastSave: string | null;
  showFormatting: boolean;
  isFullscreen: boolean;
  onToggleFormatting: () => void;
  onSave: () => void;
  onToggleFullscreen: () => void;
}

export function Header({
  wordCount,
  charCount,
  lastSave,
  showFormatting,
  isFullscreen,
  onToggleFormatting,
  onSave,
  onToggleFullscreen,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border-b bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-2 sm:mb-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono dark:border-gray-600 dark:text-gray-300">
            {wordCount} mots
          </Badge>
          <Badge variant="outline" className="font-mono dark:border-gray-600 dark:text-gray-300">
            {charCount} caractères
          </Badge>
          {lastSave && (
            <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
              Sauvegardé: {lastSave}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={showFormatting}
              onPressedChange={onToggleFormatting}
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
              onClick={onSave}
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
              onClick={onToggleFullscreen}
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
  );
}
