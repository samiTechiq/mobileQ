import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, BarChart, Bell, CheckCircle, Clock, Printer, Users } from 'lucide-react';

const Features = () => {
    return (
        <>
            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-16 md:py-24">
                <div className="mb-16 text-center">
                    <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Features</Badge>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Everything you need to manage queues</h2>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Our comprehensive queue management system streamlines customer flow and staff allocation.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <Clock className="mb-4 h-12 w-12 text-indigo-600" />
                            <CardTitle>Real-time Queue Management</CardTitle>
                            <CardDescription>Monitor and manage all customer queues in real-time from a centralized dashboard.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Printer className="mb-4 h-12 w-12 text-indigo-600" />
                            <CardTitle>Ticket Printing</CardTitle>
                            <CardDescription>Print customer tickets with queue numbers, estimated wait times, and service details.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Bell className="mb-4 h-12 w-12 text-indigo-600" />
                            <CardTitle>Staff Notifications</CardTitle>
                            <CardDescription>Instantly notify staff when customers are assigned to them to ensure prompt service.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Users className="mb-4 h-12 w-12 text-indigo-600" />
                            <CardTitle>Multi-tenant Support</CardTitle>
                            <CardDescription>Securely manage multiple business locations with separate accounts and permissions.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <BarChart className="mb-4 h-12 w-12 text-indigo-600" />
                            <CardTitle>Analytics & Reporting</CardTitle>
                            <CardDescription>Gain insights into wait times, service duration, and staff performance.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CheckCircle className="mb-4 h-12 w-12 text-indigo-600" />
                            <CardTitle>Service Customization</CardTitle>
                            <CardDescription>Define different service types with custom fields and routing rules.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Features;
