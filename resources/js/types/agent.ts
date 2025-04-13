import { User } from './user';

export interface Agent {
    name: string;
    id: number;
    user_id: number;
    business_id: number;
    status: 'available' | string; // Add other possible status values if known
    created_at: string;
    updated_at: string;
    user: User;
}
export interface AgentWithStatus extends Agent {
    status: 'available' | 'busy' | 'offline'; // Example statuses
}
