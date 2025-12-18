export type TicketStatus = 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';
export type TicketCategory = 'technical' | 'billing' | 'general' | 'feature_request' | 'bug_report';
export type MessageSender = 'client' | 'admin' | 'ai' | 'system';

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  companyId: string;
  companyName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  assignedAdminId?: string;
  assignedAdminName?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  firstResponseAt?: string;
  resolvedAt?: string;
  slaBreached: boolean;
  unreadCount: number;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  content: string;
  sender: MessageSender;
  senderName: string;
  senderAvatar?: string;
  isInternal: boolean;
  attachments: Attachment[];
  createdAt: string;
  aiGenerated?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface TicketStats {
  openTickets: number;
  urgentTickets: number;
  waitingResponse: number;
  avgFirstResponseTime: string;
  resolvedToday: number;
  slaBreached: number;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  ticketCount: number;
}
