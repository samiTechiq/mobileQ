import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Ticket } from '@/types/ticket';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    tickets: Ticket[];
    ticketInProgress: any;
    ticketCount: any;
}

export default function AgentDashboard({ tickets, ticketInProgress, ticketCount }: Props) {
    console.log('tickets', tickets);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agent Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="bg-blue-100 shadow-md">
                        <CardContent>
                            <h3 className="text-lg font-semibold text-blue-800">Total Tickets</h3>
                            <p className="text-2xl font-bold text-blue-900">{ticketCount.total}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-yellow-100 shadow-md">
                        <CardContent>
                            <h3 className="text-lg font-semibold text-yellow-800">Tickets In Progress</h3>
                            <p className="text-2xl font-bold text-yellow-900">{ticketCount.in_progress}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-100 shadow-md">
                        <CardContent>
                            <h3 className="text-lg font-semibold text-green-800">Completed Tickets</h3>
                            <p className="text-2xl font-bold text-green-900">{ticketCount.completed}</p>
                        </CardContent>
                    </Card>
                </div>

                {ticketInProgress && (
                    <Card>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <h2 className="text-lg font-semibold">Ticket In Progress</h2>
                                <div className="flex">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">Ticket Number: {ticketInProgress.ticket_number}</p>
                                        <p className="text-sm font-medium">Subject: {ticketInProgress.subject}</p>
                                        <p className="text-sm font-medium">Description: {ticketInProgress.description}</p>
                                        <p className="text-sm font-medium">Priority: {ticketInProgress.priority}</p>
                                        <p className="text-sm font-medium">Duration: {Math.round(ticketInProgress.in_progress_minutes)} min</p>
                                    </div>
                                    <div className="ml-auto">
                                        <Link href={route('agent.ticket.complete', ticketInProgress.id)}>
                                            <Button>Complete</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {tickets && tickets.length > 0 ? (
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ticket Number</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Periority</TableHead>
                                    <TableHead>Assigned By</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TableRow key={ticket.id} className="hover:bg-muted/50">
                                        <TableCell className="font-medium">{ticket.ticket_number}</TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>{ticket.priority}</TableCell>
                                        <TableCell>{ticket.assigned_by?.name}</TableCell>
                                        <TableCell>
                                            {!ticketInProgress && (
                                                <Link href={route('agent.ticket.callnext', ticket.id)}>
                                                    <Button>Call</Button>
                                                </Link>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                ) : (
                    <Card>
                        <CardContent>
                            <p className="text-sm font-medium">No tickets available.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
