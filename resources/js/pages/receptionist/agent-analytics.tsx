import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Agent } from '@/types/agent';
import React from 'react';

interface AgentStats {
    waiting_count: number;
    in_progress_count: number;
    avg_wait_time: number;
}

interface AgentAnalyticsProps {
    agents: Agent[];
    agentStats: Record<number, AgentStats>;
}

const AgentAnalytics: React.FC<AgentAnalyticsProps> = ({ agents, agentStats }) => {
    const formatMinutes = (minutes: number): string => {
        if (!minutes) {
            return '0 min';
        }

        if (minutes < 60) {
            return `${minutes} min`;
        }

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours < 24) {
            return `${hours}h ${mins}m`;
        }

        const days = Math.floor(hours / 24);
        const hrs = hours % 24;

        return `${days}d ${hrs}h`;
    };

    return (
        <Card className="w-full shadow-md">
            <CardHeader className="bg-white px-4 pb-2 sm:px-6">
                <CardTitle className="text-lg font-semibold sm:text-xl">Agent Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Responsive container with horizontal scroll for small screens */}
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-xs font-semibold sm:text-sm">Agent</TableHead>
                                    <TableHead className="text-center text-xs font-semibold sm:text-sm">
                                        <span className="hidden sm:inline">Waiting</span>
                                        <span className="sm:hidden">Wait</span>
                                    </TableHead>
                                    <TableHead className="text-center text-xs font-semibold sm:text-sm">
                                        <span className="hidden sm:inline">In Progress</span>
                                        <span className="sm:hidden">In Prog</span>
                                    </TableHead>
                                    <TableHead className="text-center text-xs font-semibold sm:text-sm">
                                        <span className="hidden sm:inline">Avg. Wait</span>
                                        <span className="sm:hidden">Avg</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.length > 0 ? (
                                    agents.map((agent) => {
                                        const stats = agentStats[agent.id] || {
                                            waiting_count: 0,
                                            in_progress_count: 0,
                                            avg_wait_time: 0,
                                        };

                                        return (
                                            <TableRow key={agent.id} className="hover:bg-gray-50">
                                                <TableCell className="py-2 text-xs font-medium sm:py-4 sm:text-sm">
                                                    {/* Truncate long names on mobile */}
                                                    <span className="block max-w-[120px] truncate sm:max-w-none">{agent.name}</span>
                                                </TableCell>
                                                <TableCell className="py-2 text-center sm:py-4">
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-gray-100 px-1.5 text-xs text-gray-800 hover:bg-gray-100 sm:px-2 sm:text-sm"
                                                    >
                                                        {stats.waiting_count}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-2 text-center sm:py-4">
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-blue-100 px-1.5 text-xs text-blue-800 hover:bg-blue-100 sm:px-2 sm:text-sm"
                                                    >
                                                        {stats.in_progress_count}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-2 text-center text-xs sm:py-4 sm:text-sm">
                                                    {formatMinutes(stats.avg_wait_time)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-sm">
                                            No agents found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Mobile helper text */}
                <div className="sm:hidden">
                    {agents.length > 0 && (
                        <div className="mt-2 px-4 pb-4">
                            <p className="text-xs text-gray-500">Swipe to see more details</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AgentAnalytics;
