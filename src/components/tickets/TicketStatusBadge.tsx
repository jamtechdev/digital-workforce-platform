import { cn } from '@/lib/utils';
import { TicketStatus } from '@/types/ticket';

interface TicketStatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-status-open/10 text-status-open border-status-open/20',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20',
  },
  waiting_response: {
    label: 'Waiting Response',
    className: 'bg-status-waiting/10 text-status-waiting border-status-waiting/20',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-status-resolved/10 text-status-resolved border-status-resolved/20',
  },
  closed: {
    label: 'Closed',
    className: 'bg-status-closed/10 text-status-closed border-status-closed/20',
  },
};

export function TicketStatusBadge({ status, className }: TicketStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
