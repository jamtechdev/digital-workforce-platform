import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { TicketFilters } from '@/components/tickets/TicketFilters';
import { TicketTable } from '@/components/tickets/TicketTable';
import { CreateTicketModal } from '@/components/tickets/CreateTicketModal';
import { listTickets, createTicket } from '@/services/support.service';
import { Ticket } from '@/types/ticket';

export default function ClientTicketsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter to only show client's company tickets (mock: company_id 1)
  const tickets = listTickets();
  const clientTickets = tickets.filter((t) => t.company_id === 1);

  const filteredTickets = clientTickets.filter((ticket) => {
    const matchesSearch =
      ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleCreateTicket = (data: {
    subject: string;
    category: string;
    priority: string;
    description: string;
  }) => {
    createTicket({
      ...data,
      category: data.category as any,
      priority: data.priority as any,
      company_id: 1,
      company_name: 'Acme Corp',
      user_id: 101,
      user_name: 'John Smith',
      user_email: 'john@acme.com',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="My Support Tickets"
        description="View and manage your support requests"
        actions={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        }
      />

      <div className="bg-card rounded-xl border shadow-sm">
        <div className="p-4 border-b">
          <TicketFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
        </div>

        <TicketTable tickets={filteredTickets} />
      </div>

      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}
