export type TicketStatus = 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';
export type TicketCategory = 'technical' | 'billing' | 'general' | 'feature_request' | 'bug_report';
export type MessageSender = 'client' | 'admin' | 'ai' | 'system';

export interface Ticket {
  id: number;
  eid: string;
  created_at: number;
  updated_at?: number;
  ticket_number: string;
  subject: string;
  description?: string; // Optional if not in core list but needed for UI
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  company_id: number;
  user_id: number;
  tags: string[];
  unread_messages_count: number;
  sla_breach: boolean;
  assigned_admin_id: number | null;
  assigned_admin_name?: string;
  // UI helper fields (may be joined in real API)
  company_name?: string;
  user_name?: string;
  user_email?: string;
}

export interface TicketMessage {
  id: number;
  created_at: number;
  ticket_id: number;
  sender_type: MessageSender;
  sender_id: number;
  sender_name?: string; // UI helper
  sender_avatar?: string; // UI helper
  message_text: string;
  is_internal: boolean;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface TicketStats {
  open_tickets: number;
  urgent_tickets: number;
  waiting_response: number;
  avg_first_response_time: string;
  resolved_today: number;
  sla_breached_count: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'admin';
  company_id?: number;
}

export interface Admin extends User {
  role: 'admin';
  ticket_count: number;
}
