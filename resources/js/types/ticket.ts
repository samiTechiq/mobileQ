import { User } from './user';

interface Business {
    id: number;
    name: string;
}

interface Agent {
    id: number;
    name: string;
}

export interface Ticket {
    id: number;
    client_name?: string;
    subject?: string;
    business: Business;
    description?: string;
    priority?: string;
    status: 'waiting' | 'in_progress' | 'completed' | 'cancel';
    ticket_number: string;
    agent_id?: User | null;
    assigned_by?: User;
    started_at?: string | null;
    completed_at?: string | null;
    business_id?: number | null;
    wait_time?: number;
    wait_time_formatted?: string;
    waiting_minutes?: number;
    waiting_formatted?: string;
    in_progress_minutes?: number;
    in_progress_formatted?: string;
    status_formatted: string;
    created_at: string;
    created_at_formatted: string;
    agent?: Agent | null;
}
