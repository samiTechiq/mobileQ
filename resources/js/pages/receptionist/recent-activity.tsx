import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ticket } from '@/types/ticket';
import React from 'react';

interface RecentActivityProps {
    tickets: Ticket[];
}

const getStatusClass = (status: string): string => {
    switch (status) {
        case 'waiting':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'in_progress':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'completed':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'cancel':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getWaitTimeDisplay = (ticket: Ticket): string => {
    if (ticket.status === 'completed' && ticket.wait_time_formatted) {
        return ticket.wait_time_formatted;
    } else if (ticket.status === 'waiting' && ticket.waiting_formatted) {
        return ticket.waiting_formatted;
    } else if (ticket.status === 'in_progress' && ticket.in_progress_formatted) {
        return ticket.in_progress_formatted;
    } else {
        return '-';
    }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ tickets }) => {
    return (
        <Card className="w-full shadow-md">
            <CardHeader className="bg-white px-4 pb-2 sm:px-6">
                <CardTitle className="text-lg font-semibold sm:text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Responsive container with horizontal scroll on small screens */}
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="wink-sans-font text-xs font-semibold whitespace-nowrap sm:text-sm">Ticket #</TableHead>
                                    <TableHead className="wink-sans-font hidden text-xs font-semibold whitespace-nowrap sm:table-cell sm:text-sm">
                                        Client
                                    </TableHead>
                                    <TableHead className="wink-sans-font hidden text-xs font-semibold whitespace-nowrap sm:text-sm md:table-cell">
                                        Agent
                                    </TableHead>
                                    <TableHead className="wink-sans-font text-xs font-semibold whitespace-nowrap sm:text-sm">Status</TableHead>
                                    <TableHead className="wink-sans-font hidden text-xs font-semibold whitespace-nowrap sm:table-cell sm:text-sm">
                                        Created
                                    </TableHead>
                                    <TableHead className="wink-sans-font text-xs font-semibold whitespace-nowrap sm:text-sm">Wait Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.length > 0 ? (
                                    tickets.map((ticket) => (
                                        <TableRow key={ticket.id} className="hover:bg-gray-50">
                                            <TableCell className="py-2 text-xs font-medium sm:py-4 sm:text-sm">{ticket.ticket_number}</TableCell>
                                            <TableCell className="hidden py-2 text-xs sm:table-cell sm:py-4 sm:text-sm">
                                                {ticket.client_name}
                                            </TableCell>
                                            <TableCell className="hidden py-2 text-xs sm:py-4 sm:text-sm md:table-cell">
                                                {ticket.agent?.name}
                                            </TableCell>
                                            <TableCell className="py-2 sm:py-4">
                                                <Badge variant="outline" className={`text-xs ${getStatusClass(ticket.status)}`}>
                                                    {ticket.status_formatted}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden py-2 text-xs sm:table-cell sm:py-4 sm:text-sm">
                                                {ticket.created_at_formatted}
                                            </TableCell>
                                            <TableCell className="py-2 text-xs sm:py-4 sm:text-sm">{getWaitTimeDisplay(ticket)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-sm">
                                            No recent activity
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Mobile detail view (only shown on xs screens) */}
                <div className="sm:hidden">
                    {tickets.length > 0 && (
                        <div className="mt-2 space-y-3 px-4 pb-4">
                            <p className="text-xs text-gray-500">Swipe to see more columns or tap ticket for details</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivity;
