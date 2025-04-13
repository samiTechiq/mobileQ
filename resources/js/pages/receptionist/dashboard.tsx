import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Agent } from '@/types/agent';
import { Ticket } from '@/types/ticket';
import { Head, Link } from '@inertiajs/react';
import { ListOrdered, PlusCircle } from 'lucide-react';
import AgentAnalytics from './agent-analytics';
import RecentActivity from './recent-activity';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface AgentStats {
    waiting_count: number;
    in_progress_count: number;
    avg_wait_time: number;
}

interface OverallStats {
    total_waiting: number;
    total_in_progress: number;
    total_completed_today: number;
    avg_wait_time: number;
}

interface DashboardProps {
    recentTickets: Ticket[];
    agents: Agent[];
    agentStats: Record<number, AgentStats>;
    overallStats: OverallStats;
}

export default function ReceptionistDashboard({ recentTickets, agents, agentStats, overallStats }: DashboardProps) {
    // Helper function to format minutes
    const formatMinutes = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours}h ${mins}m`;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Receptionist Dashboard" />
            <div className="flex h-full w-full flex-1 flex-col gap-4 p-2 sm:p-4">
                {/* Stats Overview - Responsive grid that stacks on mobile */}
                <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:gap-6 md:grid-cols-4">
                    {/* Waiting Tickets Card */}
                    <Card className="overflow-hidden border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md">
                        <div className="absolute top-0 right-0 h-12 w-12 opacity-10 sm:h-16 sm:w-16">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full text-blue-500">
                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h13.5a3 3 0 003-3V8.25a3 3 0 00-3-3H5.25z" />
                                <path d="M6.75 7.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm4 0a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm4 0a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75z" />
                            </svg>
                        </div>
                        <CardHeader className="p-3 pb-0 sm:p-6 sm:pb-2">
                            <CardTitle className="text-xs font-medium text-blue-700 sm:text-sm">Waiting Tickets</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-1 sm:p-6 sm:pt-0">
                            <div className="text-xl font-bold text-blue-900 sm:text-3xl">{overallStats.total_waiting}</div>
                        </CardContent>
                    </Card>

                    {/* In Progress Card */}
                    <Card className="overflow-hidden border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md">
                        <div className="absolute top-0 right-0 h-12 w-12 opacity-10 sm:h-16 sm:w-16">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full text-amber-500">
                                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <CardHeader className="p-3 pb-0 sm:p-6 sm:pb-2">
                            <CardTitle className="text-xs font-medium text-amber-700 sm:text-sm">In Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-1 sm:p-6 sm:pt-0">
                            <div className="text-xl font-bold text-amber-900 sm:text-3xl">{overallStats.total_in_progress}</div>
                        </CardContent>
                    </Card>

                    {/* Completed Today Card */}
                    <Card className="overflow-hidden border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md">
                        <div className="absolute top-0 right-0 h-12 w-12 opacity-10 sm:h-16 sm:w-16">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-full w-full text-emerald-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <CardHeader className="p-3 pb-0 sm:p-6 sm:pb-2">
                            <CardTitle className="text-xs font-medium text-emerald-700 sm:text-sm">Completed Today</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-1 sm:p-6 sm:pt-0">
                            <div className="text-xl font-bold text-emerald-900 sm:text-3xl">{overallStats.total_completed_today}</div>
                        </CardContent>
                    </Card>

                    {/* Avg. Wait Time Card */}
                    <Card className="overflow-hidden border-purple-100 bg-gradient-to-br from-purple-50 to-fuchsia-50 shadow-md">
                        <div className="absolute top-0 right-0 h-12 w-12 opacity-10 sm:h-16 sm:w-16">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full text-purple-500">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <CardHeader className="p-3 pb-0 sm:p-6 sm:pb-2">
                            <CardTitle className="text-xs font-medium text-purple-700 sm:text-sm">Avg. Wait Time</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-1 sm:p-6 sm:pt-0">
                            <div className="text-xl font-bold text-purple-900 sm:text-3xl">{formatMinutes(overallStats.avg_wait_time)}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Re-arranged layout for better mobile experience */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {/* Quick Actions - Full width on mobile */}
                    <Card className="sm:hidden">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-2 p-4 pt-0">
                            <Button className="flex-1 justify-center" asChild>
                                <Link href={route('receptionist.ticket.create')}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Ticket
                                </Link>
                            </Button>
                            <Button variant="secondary" className="flex-1 justify-center" asChild>
                                <Link href="/queue">
                                    <ListOrdered className="mr-2 h-4 w-4" />
                                    View Queue
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Desktop layout for larger screens */}
                    <div className="hidden gap-6 sm:grid sm:grid-cols-3">
                        {/* Agent Analytics - 2/3 width on desktop */}
                        <div className="sm:col-span-2">
                            <AgentAnalytics agents={agents} agentStats={agentStats} />
                        </div>

                        {/* Quick Actions - 1/3 width on desktop */}
                        <div className="sm:col-span-1">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full justify-start" asChild>
                                        <Link href={route('receptionist.ticket.create')}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Create New Ticket
                                        </Link>
                                    </Button>
                                    <Button variant="secondary" className="w-full justify-start" asChild>
                                        <Link href="/queue">
                                            <ListOrdered className="mr-2 h-4 w-4" />
                                            View Current Queue
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Agent Analytics - Full width on mobile */}
                    <div className="sm:hidden">
                        <AgentAnalytics agents={agents} agentStats={agentStats} />
                    </div>

                    {/* Recent Activity Table - Full width on all screens */}
                    <div>
                        <RecentActivity tickets={recentTickets} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
