import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Building2, Mail, User } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { PriorityIndicator } from '@/components/tickets/PriorityIndicator';
import { MessageBubble } from '@/components/tickets/MessageBubble';
import { ReplyComposer } from '@/components/tickets/ReplyComposer';
import { AISuggestionCard } from '@/components/tickets/AISuggestionCard';
import { mockTickets, mockMessages, mockAdmins, categories } from '@/data/mockData';
import { TicketMessage, TicketStatus, TicketPriority } from '@/types/ticket';
import { useToast } from '@/hooks/use-toast';

export default function AdminTicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const ticket = mockTickets.find((t) => t.id === id);
  const [messages, setMessages] = useState<TicketMessage[]>(
    mockMessages[id || ''] || []
  );
  const [status, setStatus] = useState<TicketStatus>(ticket?.status || 'open');
  const [priority, setPriority] = useState<TicketPriority>(ticket?.priority || 'normal');
  const [assignedAdmin, setAssignedAdmin] = useState(ticket?.assignedAdminId || '');

  const aiSuggestion = `Thank you for reaching out about this issue. I understand how frustrating this must be.

Based on the information provided, this appears to be related to a recent cache update. Here are the steps to resolve it:

1. Clear your browser cache completely
2. Log out and log back in
3. If the issue persists, try accessing from an incognito window

Please let me know if these steps resolve your issue, or if you need further assistance.`;

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-lg font-medium">Ticket not found</p>
        <Button variant="link" onClick={() => navigate('/admin/support/tickets')}>
          Back to tickets
        </Button>
      </div>
    );
  }

  const categoryLabel = categories.find((c) => c.value === ticket.category)?.label;

  const handleSendReply = (content: string, isInternal: boolean) => {
    const newMessage: TicketMessage = {
      id: `m${Date.now()}`,
      ticketId: ticket.id,
      content,
      sender: 'admin',
      senderName: 'Sarah Johnson',
      isInternal,
      attachments: [],
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    
    toast({
      title: isInternal ? 'Note added' : 'Reply sent',
      description: isInternal
        ? 'Internal note has been added to the ticket.'
        : 'Your reply has been sent to the customer.',
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as TicketStatus);
    toast({
      title: 'Status updated',
      description: `Ticket status changed to ${newStatus.replace('_', ' ')}.`,
    });
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority as TicketPriority);
    toast({
      title: 'Priority updated',
      description: `Ticket priority changed to ${newPriority}.`,
    });
  };

  const handleAssignmentChange = (adminId: string) => {
    setAssignedAdmin(adminId);
    const admin = mockAdmins.find((a) => a.id === adminId);
    toast({
      title: 'Ticket reassigned',
      description: `Ticket assigned to ${admin?.name || 'Unassigned'}.`,
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/support/tickets')}
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
              <TicketStatusBadge status={status} />
              <PriorityIndicator priority={priority} />
            </div>
            <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
          </div>
        </div>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Conversation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Messages */}
          <div className="bg-card rounded-xl border">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Conversation</h2>
            </div>
            <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>

          {/* AI Suggestion */}
          <AISuggestionCard
            suggestion={aiSuggestion}
            onInsert={(text) => {
              // Would insert into reply composer
              toast({ title: 'Inserted', description: 'AI suggestion inserted into reply.' });
            }}
            onRegenerate={() => {
              toast({ title: 'Regenerating...', description: 'Getting a new AI suggestion.' });
            }}
          />

          {/* Reply Composer */}
          <ReplyComposer onSend={handleSendReply} isAdmin />
        </div>

        {/* Right - Controls */}
        <div className="space-y-6">
          {/* Ticket Controls */}
          <div className="bg-card rounded-xl border p-4 space-y-4">
            <h3 className="font-semibold">Ticket Details</h3>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Status
              </label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="waiting_response">Waiting Response</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Priority
              </label>
              <Select value={priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Category
              </label>
              <div className="text-sm font-medium">{categoryLabel}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Assigned To
              </label>
              <Select value={assignedAdmin} onValueChange={handleAssignmentChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="">Unassigned</SelectItem>
                  {mockAdmins.map((admin) => (
                    <SelectItem key={admin.id} value={admin.id}>
                      {admin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Tags
              </label>
              <div className="flex flex-wrap gap-1">
                {ticket.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-muted rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-card rounded-xl border p-4 space-y-4">
            <h3 className="font-semibold">Customer</h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{ticket.clientName}</p>
                <p className="text-xs text-muted-foreground">{ticket.clientEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{ticket.companyName}</span>
            </div>

            <div className="pt-2 border-t text-xs text-muted-foreground space-y-1">
              <p>
                Created: {format(new Date(ticket.createdAt), 'MMM d, yyyy h:mm a')}
              </p>
              <p>
                Updated: {format(new Date(ticket.updatedAt), 'MMM d, yyyy h:mm a')}
              </p>
              {ticket.firstResponseAt && (
                <p>
                  First Response:{' '}
                  {format(new Date(ticket.firstResponseAt), 'MMM d, yyyy h:mm a')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
