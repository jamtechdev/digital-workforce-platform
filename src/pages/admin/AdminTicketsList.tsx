import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { TicketFilters } from '@/components/tickets/TicketFilters';
import { TicketTable } from '@/components/tickets/TicketTable';
import { listTickets } from '@/services/support.service';

export default function AdminTicketsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const tickets = listTickets();

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.company_name?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="All Tickets"
        description="Manage support tickets across all companies"
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
            showCompanyFilter
          />
        </div>

        <TicketTable tickets={filteredTickets} isAdmin />
      </div>
    </div>
  );
}
