import { Bot, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AISuggestionCardProps {
  suggestion: string;
  onInsert: (text: string) => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}

export function AISuggestionCard({
  suggestion,
  onInsert,
  onRegenerate,
  isLoading = false,
}: AISuggestionCardProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion);
    toast({
      title: 'Copied to clipboard',
      description: 'AI suggestion has been copied.',
    });
  };

  return (
    <div className="border border-info/20 rounded-xl bg-info/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center">
          <Bot className="h-3.5 w-3.5 text-info" />
        </div>
        <span className="text-sm font-medium text-info">AI Suggested Reply</span>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <div className="h-4 bg-info/10 rounded animate-pulse w-full" />
          <div className="h-4 bg-info/10 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-info/10 rounded animate-pulse w-5/6" />
        </div>
      ) : (
        <>
          <p className="text-sm text-foreground/80 whitespace-pre-wrap">
            {suggestion}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onInsert(suggestion)}
              className="text-info border-info/30 hover:bg-info/10"
            >
              Insert into reply
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRegenerate}>
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
