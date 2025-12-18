import { useState } from 'react';
import { Paperclip, Send, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ReplyComposerProps {
  onSend: (message: string, isInternal: boolean) => void;
  isAdmin?: boolean;
  disabled?: boolean;
}

export function ReplyComposer({ onSend, isAdmin = false, disabled = false }: ReplyComposerProps) {
  const [message, setMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSend(message, isInternal);
    setMessage('');
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        'border rounded-xl p-4 transition-colors',
        isInternal ? 'border-warning/30 bg-warning/5' : 'bg-card'
      )}
    >
      <Textarea
        placeholder={
          isInternal
            ? 'Write an internal note (only visible to admins)...'
            : 'Type your reply...'
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        disabled={disabled}
        className={cn(
          'border-0 p-0 resize-none focus-visible:ring-0 bg-transparent',
          isInternal && 'placeholder:text-warning/60'
        )}
      />

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" disabled={disabled}>
            <Paperclip className="h-4 w-4 mr-1" />
            Attach
          </Button>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Switch
                checked={isInternal}
                onCheckedChange={setIsInternal}
                id="internal-note"
              />
              <label
                htmlFor="internal-note"
                className={cn(
                  'text-sm font-medium cursor-pointer flex items-center gap-1',
                  isInternal && 'text-warning'
                )}
              >
                <Lock className="h-3.5 w-3.5" />
                Internal Note
              </label>
            </div>
          )}
        </div>

        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled || isSending}
          size="sm"
        >
          <Send className="h-4 w-4 mr-1" />
          {isSending ? 'Sending...' : isInternal ? 'Add Note' : 'Send Reply'}
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground mt-2">
        Press ⌘ + Enter to send
      </p>
    </div>
  );
}
