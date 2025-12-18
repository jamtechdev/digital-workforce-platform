import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { PriorityIndicator } from '@/components/tickets/PriorityIndicator';
import { MessageBubble } from '@/components/tickets/MessageBubble';
import { ReplyComposer } from '@/components/tickets/ReplyComposer';
import { mockTickets, mockMessages, categories } from '@/data/mockData';
import { TicketMessage, MessageSender } from '@/types/ticket';
import { useState } from 'react';

export default function ClientTicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const ticket = mockTickets.find((t) => t.id === id);
  const [messages, setMessages] = useState<TicketMessage[]>(
    mockMessages[id || ''] || []
  );

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-lg font-medium">Ticket not found</p>
        <Button variant="link" onClick={() => navigate('/support/tickets')}>
          Back to tickets
        </Button>
      </div>
    );
  }

  const categoryLabel = categories.find((c) => c.value === ticket.category)?.label;

  // Filter out internal notes for client view
  const visibleMessages = messages.filter((m) => !m.isInternal);

  const handleSendReply = (content: string) => {
    const newMessage: TicketMessage = {
      id: `m${Date.now()}`,
      ticketId: ticket.id,
      content,
      sender: 'client',
      senderName: ticket.clientName,
      isInternal: false,
      attachments: [],
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/support/tickets')}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to tickets
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono text-muted-foreground">
                {ticket.ticketNumber}
              </span>
              <TicketStatusBadge status={ticket.status} />
              <PriorityIndicator priority={ticket.priority} />
            </div>
            <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-card rounded-xl border p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Created</p>
              <p className="font-medium">
                {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Last Updated</p>
              <p className="font-medium">
                {format(new Date(ticket.updatedAt), 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Assigned To</p>
              <p className="font-medium">{ticket.assignedAdminName || 'Unassigned'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-4 w-4 flex items-center justify-center text-muted-foreground">
              📂
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Category</p>
              <p className="font-medium">{categoryLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="bg-card rounded-xl border mb-6">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Conversation</h2>
        </div>
        <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
          {visibleMessages.map((message) => (
            <MessageBubble key={message.id} message={message} isClient />
          ))}
        </div>
      </div>

      {/* Reply Composer */}
      {ticket.status !== 'closed' && (
        <ReplyComposer onSend={(content) => handleSendReply(content)} />
      )}

      {ticket.status === 'closed' && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          This ticket is closed. Please create a new ticket if you need further assistance.
        </div>
      )}
    </div>
  );
}
