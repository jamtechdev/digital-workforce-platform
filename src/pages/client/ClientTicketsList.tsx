import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { TicketFilters } from '@/components/tickets/TicketFilters';
import { TicketTable } from '@/components/tickets/TicketTable';
import { CreateTicketModal } from '@/components/tickets/CreateTicketModal';
import { mockTickets } from '@/data/mockData';
import { Ticket } from '@/types/ticket';

export default function ClientTicketsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter to only show client's company tickets (mock: comp-1)
  const clientTickets = mockTickets.filter((t) => t.companyId === 'comp-1');

  const filteredTickets = clientTickets.filter((ticket) => {
    const matchesSearch =
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    console.log('Creating ticket:', data);
    // In real app, this would call an API
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
