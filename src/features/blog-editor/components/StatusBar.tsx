import { HelpCircle, Minus, Plus } from 'lucide-react';

interface StatusBarProps {
  lineHeight: string;
  fontSize: string;
  onDecreaseFont: () => void;
  onIncreaseFont: () => void;
  canDecrease: boolean;
  canIncrease: boolean;
}

export function StatusBar({
  lineHeight,
  fontSize,
  onDecreaseFont,
  onIncreaseFont,
  canDecrease,
  canIncrease,
}: StatusBarProps) {
  const currentSize = parseInt(fontSize.replace('px', ''));

  return (
    <div className="flex flex-wrap items-center justify-between p-2 border-t bg-brand-mint/5 dark:bg-brand-primary-navy/40 dark:border-brand-primary/30 text-xs text-brand-secondary dark:text-brand-secondary/80">
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
          onClick={onDecreaseFont}
          disabled={canDecrease}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="font-mono">{currentSize}px</span>
        <button
          onClick={onIncreaseFont}
          disabled={canIncrease}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
