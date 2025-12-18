import { useNavigate } from 'react-router-dom';
import {
  Ticket,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/tickets/StatCard';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { PriorityIndicator } from '@/components/tickets/PriorityIndicator';
import { listTickets, getStats } from '@/services/support.service';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const tickets = listTickets();
  const stats = getStats();

  // Get recent tickets (open or urgent)
  const urgentTickets = tickets
    .filter((t) => t.priority === 'urgent' || t.sla_breach)
    .slice(0, 5);

  const recentTickets = [...tickets]
    .sort((a, b) => (b.updated_at || b.created_at) - (a.updated_at || a.created_at))
    .slice(0, 5);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Support Dashboard"
        description="Overview of your support operations"
        actions={
          <Button onClick={() => navigate('/admin/support/tickets')}>
            View All Tickets
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Open Tickets"
          value={stats.open_tickets}
          icon={Ticket}
          trend={{ value: 12, isPositive: false }}
        />
        <StatCard
          title="Urgent Tickets"
          value={stats.urgent_tickets}
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          title="Waiting Response"
          value={stats.waiting_response}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Avg First Response"
          value={stats.avg_first_response_time}
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Tickets */}
        <div className="bg-card rounded-xl border">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h2 className="font-semibold">Urgent & SLA Breached</h2>
            </div>
            <span className="text-xs text-muted-foreground">
              {urgentTickets.length} tickets
            </span>
          </div>
          <div className="divide-y">
            {urgentTickets.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                <p className="text-sm">No urgent tickets! Great job!</p>
              </div>
            ) : (
              urgentTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => navigate(`/admin/support/tickets/${ticket.eid}`)}
                  className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {ticket.ticket_number}
                        </span>
                        <PriorityIndicator priority={ticket.priority} />
                        {ticket.sla_breach && (
                          <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-medium">
                            SLA Breached
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-sm truncate">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {ticket.company_name}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Recent Activity</h2>
            </div>
          </div>
          <div className="divide-y">
            {recentTickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => navigate(`/admin/support/tickets/${ticket.eid}`)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {ticket.ticket_number}
                      </span>
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                    <p className="font-medium text-sm truncate">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {format(new Date(ticket.updated_at || ticket.created_at), 'MMM d, h:mm a')}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
