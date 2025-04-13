export type User = {
    id: string | number; // User ID (can be string or number)
    name: string;
    email: string;
    password?: string; // Optional password
    role: string;
    avatar?: string; // Optional avatar URL
    address?: string; // Optional address
    city?: string; // Optional city
    state?: string; // Optional state
    postal_code?: string; // Optional postal code
    country?: string; // Optional country
    timezone?: string; // Optional timezone
    locale?: string; // Optional locale
    business_id?: string | number; // Optional business ID (can be string or number)
    phone?: string; // Optional phone number
    active: boolean;
};
