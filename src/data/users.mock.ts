import { User, Admin } from '@/types/ticket';

export const mockUsers: User[] = [
    {
        id: 101,
        name: 'John Smith',
        email: 'john@acme.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        role: 'client',
        company_id: 1,
    },
    {
        id: 102,
        name: 'Emily Chen',
        email: 'emily@techstart.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        role: 'client',
        company_id: 2,
    },
    {
        id: 103,
        name: 'Alex Turner',
        email: 'alex@acme.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        role: 'client',
        company_id: 1,
    },
    {
        id: 104,
        name: 'Maria Garcia',
        email: 'maria@globalsolutions.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        role: 'client',
        company_id: 3,
    },
];

export const mockAdmins: Admin[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah@support.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        role: 'admin',
        ticket_count: 15,
    },
    {
        id: 2,
        name: 'Mike Williams',
        email: 'mike@support.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        role: 'admin',
        ticket_count: 12,
    },
    {
        id: 3,
        name: 'Lisa Brown',
        email: 'lisa@support.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        role: 'admin',
        ticket_count: 8,
    },
];
