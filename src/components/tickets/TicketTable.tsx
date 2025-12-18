import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Ticket } from '@/types/ticket';
import { TicketStatusBadge } from './TicketStatusBadge';
import { PriorityIndicator } from './PriorityIndicator';
import { cn } from '@/lib/utils';
import { AlertTriangle, MessageCircle } from 'lucide-react';

interface TicketTableProps {
  tickets: Ticket[];
  isAdmin?: boolean;
}

export function TicketTable({ tickets, isAdmin = false }: TicketTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (ticket: Ticket) => {
    if (isAdmin) {
      navigate(`/admin/support/tickets/${ticket.id}`);
    } else {
      navigate(`/support/tickets/${ticket.id}`);
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-1">No tickets found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or create a new ticket
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ticket
            </th>
            {isAdmin && (
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Company
              </th>
            )}
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Priority
            </th>
            {isAdmin && (
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Assigned To
              </th>
            )}
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => handleRowClick(ticket)}
              className={cn(
                'border-b border-border cursor-pointer transition-colors hover:bg-muted/50',
                ticket.unreadCount > 0 && 'bg-primary/5'
              )}
            >
              <td className="py-4 px-4">
                <div className="flex items-start gap-3">
                  {ticket.unreadCount > 0 && (
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {ticket.ticketNumber}
                      </span>
                      {ticket.slaBreached && (
                        <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                      )}
                    </div>
                    <p className="font-medium text-sm mt-0.5 line-clamp-1">
                      {ticket.subject}
                    </p>
                  </div>
                </div>
              </td>
              {isAdmin && (
                <td className="py-4 px-4">
                  <span className="text-sm">{ticket.companyName}</span>
                </td>
              )}
              <td className="py-4 px-4">
                <TicketStatusBadge status={ticket.status} />
              </td>
              <td className="py-4 px-4">
                <PriorityIndicator priority={ticket.priority} showLabel />
              </td>
              {isAdmin && (
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">
                    {ticket.assignedAdminName || '—'}
                  </span>
                </td>
              )}
              <td className="py-4 px-4">
                <span className="text-sm text-muted-foreground">
                  {format(new Date(ticket.updatedAt), 'MMM d, h:mm a')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
