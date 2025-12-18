import { cn } from '@/lib/utils';
import { TicketMessage } from '@/types/ticket';
import { Bot, Lock, Paperclip, User } from 'lucide-react';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: TicketMessage;
  isClient?: boolean;
}

export function MessageBubble({ message, isClient = false }: MessageBubbleProps) {
  const isOwnMessage = isClient ? message.sender === 'client' : message.sender === 'admin';
  const isAI = message.sender === 'ai';
  const isSystem = message.sender === 'system';
  const isInternal = message.isInternal;

  if (isSystem) {
    return (
      <div className="flex justify-center py-2">
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-3 animate-slide-up',
        isOwnMessage ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isAI ? 'bg-info/10 text-info' : 
          message.sender === 'client' ? 'bg-primary/10 text-primary' : 
          'bg-muted text-muted-foreground'
        )}
      >
        {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>

      {/* Content */}
      <div className={cn('flex flex-col max-w-[70%]', isOwnMessage ? 'items-end' : 'items-start')}>
        {/* Header */}
        <div className={cn('flex items-center gap-2 mb-1', isOwnMessage && 'flex-row-reverse')}>
          <span className="text-sm font-medium">{message.senderName}</span>
          {isAI && (
            <span className="text-[10px] font-medium bg-info/10 text-info px-1.5 py-0.5 rounded">
              AI Generated
            </span>
          )}
          {isInternal && (
            <span className="text-[10px] font-medium bg-warning/10 text-warning px-1.5 py-0.5 rounded inline-flex items-center gap-1">
              <Lock className="h-2.5 w-2.5" />
              Internal
            </span>
          )}
        </div>

        {/* Bubble */}
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm',
            isOwnMessage
              ? 'bg-primary text-primary-foreground rounded-tr-sm'
              : isAI
              ? 'bg-info/10 text-foreground border border-info/20 rounded-tl-sm'
              : isInternal
              ? 'bg-warning/10 text-foreground border border-warning/20 border-dashed rounded-tl-sm'
              : 'bg-muted text-foreground rounded-tl-sm'
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Attachments */}
        {message.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.attachments.map((attachment) => (
              <a
                key={attachment.id}
                href={attachment.url}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                <Paperclip className="h-3 w-3" />
                {attachment.name}
              </a>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-muted-foreground mt-1">
          {format(new Date(message.createdAt), 'MMM d, h:mm a')}
        </span>
      </div>
    </div>
  );
}
