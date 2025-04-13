import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Agent } from '@/types/agent';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

// Import shadcn components
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle2, Clock, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('receptionist.dashboard'),
    },
    {
        title: 'Create Ticket',
        href: route('receptionist.ticket.create'),
    },
];

interface FormData {
    client_name: string;
    subject?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    agent_id: number | null;
}

const Create = ({ agents }: { agents: Agent[] }) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<FormData>>({
        client_name: '',
        subject: '',
        description: '',
        priority: 'medium',
        agent_id: null,
    });

    const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

    const handleChange = (name: keyof FormData, value: any) => {
        setData(name, value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post(route('receptionist.ticket.store'), {
            onSuccess: () => {
                reset();
                setSubmissionSuccess(true);
                setTimeout(() => {
                    setSubmissionSuccess(false);
                }, 3000); // Show success message for 3 seconds
            },
        });
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'low':
                return (
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                        Low
                    </Badge>
                );
            case 'medium':
                return (
                    <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">
                        Medium
                    </Badge>
                );
            case 'high':
                return (
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                        High
                    </Badge>
                );
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Ticket" />

            <div className="mx-auto w-full p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="winky-sans-font text-3xl font-bold tracking-tight">Create New Ticket</h1>
                        <p className="mt-1 text-gray-500">Submit a new support request</p>
                    </div>
                    <Button variant="outline" className="winky-sans-font">
                        Back to Tickets
                    </Button>
                </div>

                {submissionSuccess && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <AlertDescription className="font-medium">
                            Ticket created successfully. Our support team will review it shortly.
                        </AlertDescription>
                    </Alert>
                )}

                <Card className="border-none shadow">
                    <form onSubmit={handleSubmit}>
                        <CardContent className="mb-2 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="client_name" className="font-medium">
                                        Client Name (Optional)
                                    </Label>
                                    <Input
                                        id="client_name"
                                        name="client_name"
                                        value={data.client_name}
                                        onChange={(e) => handleChange('client_name', e.target.value)}
                                        className={errors.client_name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                        placeholder="Enter a client name"
                                    />
                                    {errors.client_name && (
                                        <div className="mt-1 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                            <p className="text-sm text-red-500">{errors.client_name}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="font-medium">
                                        Subject (Optional)
                                    </Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={data.subject}
                                        onChange={(e) => handleChange('subject', e.target.value)}
                                        className={errors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                        placeholder="Enter a brief summary of your issue"
                                    />
                                    {errors.subject && (
                                        <div className="mt-1 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                            <p className="text-sm text-red-500">{errors.subject}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-medium">
                                    Description (Optional)
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={6}
                                    className={errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                    placeholder="Please provide all relevant details about your issue"
                                />
                                {errors.description && (
                                    <div className="mt-1 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="priority" className="flex items-center gap-1 font-medium">
                                        <Clock className="h-4 w-4" />
                                        Priority (Optional)
                                    </Label>
                                    <Select value={data.priority} onValueChange={(value) => handleChange('priority', value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="mt-2">{getPriorityBadge(data.priority)}</div>
                                    {errors.priority && (
                                        <div className="mt-1 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                            <p className="text-sm text-red-500">{errors.priority}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="agent_id" className="flex items-center gap-1 font-medium">
                                        <User className="h-4 w-4" />
                                        Assign Agent
                                    </Label>
                                    <Select
                                        required
                                        value={data.agent_id?.toString() || ''}
                                        onValueChange={(value) => handleChange('agent_id', value ? parseInt(value) : null)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="-- Select Agent --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {agents.map((agent) => (
                                                <SelectItem key={agent.user_id} value={agent.user_id.toString()}>
                                                    {agent.user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.agent_id && (
                                        <div className="mt-1 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                            <p className="text-sm text-red-500">{errors.agent_id}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>

                        <Separator />

                        <CardFooter className="mt-4 flex items-center justify-end">
                            <Button type="submit" disabled={processing} className="px-8">
                                {processing ? 'Creating...' : 'Create Ticket'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Create;
