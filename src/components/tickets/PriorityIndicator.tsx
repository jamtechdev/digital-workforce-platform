import { cn } from '@/lib/utils';
import { TicketPriority } from '@/types/ticket';
import { AlertCircle, ArrowDown, ArrowUp, Flame } from 'lucide-react';

interface PriorityIndicatorProps {
  priority: TicketPriority;
  showLabel?: boolean;
  className?: string;
}

const priorityConfig: Record<TicketPriority, { label: string; icon: typeof AlertCircle; className: string }> = {
  low: {
    label: 'Low',
    icon: ArrowDown,
    className: 'text-priority-low',
  },
  normal: {
    label: 'Normal',
    icon: AlertCircle,
    className: 'text-priority-normal',
  },
  high: {
    label: 'High',
    icon: ArrowUp,
    className: 'text-priority-high',
  },
  urgent: {
    label: 'Urgent',
    icon: Flame,
    className: 'text-priority-urgent animate-pulse-soft',
  },
};

export function PriorityIndicator({ priority, showLabel = false, className }: PriorityIndicatorProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  return (
    <span className={cn('inline-flex items-center gap-1', config.className, className)}>
      <Icon className="h-4 w-4" />
      {showLabel && <span className="text-sm font-medium">{config.label}</span>}
    </span>
  );
}
