import { storage } from '@/utils/storage';
import { Ticket, TicketMessage, TicketStats, Admin, User } from '@/types/ticket';
import { mockTickets } from '@/data/tickets.mock';
import { mockMessages } from '@/data/messages.mock';
import { mockUsers, mockAdmins } from '@/data/users.mock';

const TICKETS_KEY = 'support_tickets_v2';
const MESSAGES_KEY = 'support_ticket_messages_v2';

/* Initialize mock data once */
export function initMockData(): void {
  if (!localStorage.getItem(TICKETS_KEY)) {
    storage.set(TICKETS_KEY, mockTickets);
  }
  if (!localStorage.getItem(MESSAGES_KEY)) {
    storage.set(MESSAGES_KEY, mockMessages);
  }
}

/* TICKETS */
export function listTickets(): Ticket[] {
  return storage.get<Ticket[]>(TICKETS_KEY, mockTickets);
}

export function listTicketsByCompany(company_id: number): Ticket[] {
  const tickets = listTickets();
  return tickets.filter((t) => t.company_id === company_id);
}

export function getTicketByEid(eid: string): Ticket | undefined {
  const tickets = listTickets();
  return tickets.find((t) => t.eid === eid);
}

export function getTicketById(id: number): Ticket | undefined {
  const tickets = listTickets();
  return tickets.find((t) => t.id === id);
}

export function createTicket(payload: {
  subject: string;
  description: string;
  category: Ticket['category'];
  priority: Ticket['priority'];
  company_id: number;
  company_name: string;
  user_id: number;
  user_name: string;
  user_email: string;
}): Ticket {
  const tickets = listTickets();

  const id = Date.now();
  const eid = `TKT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const newTicket: Ticket = {
    id,
    eid,
    created_at: id,
    updated_at: id,
    ticket_number: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
    subject: payload.subject,
    description: payload.description,
    status: 'open',
    priority: payload.priority,
    category: payload.category,
    company_id: payload.company_id,
    company_name: payload.company_name,
    user_id: payload.user_id,
    user_name: payload.user_name,
    user_email: payload.user_email,
    assigned_admin_id: null,
    tags: [],
    unread_messages_count: 0,
    sla_breach: false,
  };

  tickets.push(newTicket);
  storage.set(TICKETS_KEY, tickets);

  return newTicket;
}

export function updateTicket(
  id: number,
  updates: Partial<Pick<Ticket, 'status' | 'priority' | 'assigned_admin_id' | 'tags'>>
): Ticket | undefined {
  const tickets = listTickets();
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) return undefined;

  tickets[index] = {
    ...tickets[index],
    ...updates,
    updated_at: Date.now(),
  };

  storage.set(TICKETS_KEY, tickets);
  return tickets[index];
}

/* MESSAGES */
export function getMessages(ticket_id: number): TicketMessage[] {
  const allMessages = storage.get<TicketMessage[]>(MESSAGES_KEY, mockMessages);
  return allMessages.filter((m) => m.ticket_id === ticket_id);
}

export function addMessage(
  ticket_id: number,
  payload: {
    message_text: string;
    sender_type: TicketMessage['sender_type'];
    sender_id: number;
    sender_name: string;
    is_internal: boolean;
    attachments?: TicketMessage['attachments'];
  }
): TicketMessage {
  const allMessages = storage.get<TicketMessage[]>(MESSAGES_KEY, mockMessages);

  const newMessage: TicketMessage = {
    id: Date.now(),
    ticket_id,
    created_at: Date.now(),
    message_text: payload.message_text,
    sender_type: payload.sender_type,
    sender_id: payload.sender_id,
    sender_name: payload.sender_name,
    is_internal: payload.is_internal,
    attachments: payload.attachments || [],
  };

  allMessages.push(newMessage);
  storage.set(MESSAGES_KEY, allMessages);

  // Update ticket's unread count and timestamp
  const tickets = listTickets();
  const ticketIndex = tickets.findIndex((t) => t.id === ticket_id);
  if (ticketIndex !== -1) {
    tickets[ticketIndex].updated_at = Date.now();
    if (!payload.is_internal && payload.sender_type === 'admin') {
      // In a real system, unread count might be per user.
      // Here we'll just increment it if an admin sends a message? 
      // Actually, usually unread_messages_count is for the agent to see client messages.
    }
    if (payload.sender_type === 'client') {
      tickets[ticketIndex].unread_messages_count += 1;
    }
    storage.set(TICKETS_KEY, tickets);
  }

  return newMessage;
}

/* STATS */
export function getStats(): TicketStats {
  const tickets = listTickets();

  return {
    open_tickets: tickets.filter((t) => t.status === 'open').length,
    urgent_tickets: tickets.filter((t) => t.priority === 'urgent').length,
    waiting_response: tickets.filter((t) => t.status === 'waiting_response').length,
    avg_first_response_time: '1h 24m', // Mocked for now
    resolved_today: tickets.filter((t) => {
      if (t.status !== 'resolved') return false;
      const updated = new Date(t.updated_at || 0);
      const today = new Date();
      return updated.toDateString() === today.toDateString();
    }).length,
    sla_breached_count: tickets.filter((t) => t.sla_breach).length,
  };
}

/* ADMINS */
export function getAdmins(): Admin[] {
  return mockAdmins;
}

export function getAdminById(id: number): Admin | undefined {
  return mockAdmins.find((a) => a.id === id);
}

/* USERS */
export function getUsers(): User[] {
  return mockUsers;
}

export function getUserById(id: number): User | undefined {
  return mockUsers.find((u) => u.id === id);
}
