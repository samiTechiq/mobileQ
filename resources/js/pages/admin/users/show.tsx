import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building, Check, Clock, Edit, Globe, Mail, MapPin, Phone, Shield, User as UserIcon, X } from 'lucide-react';

// Define breadcrumbs
const getBreadcrumbs = (userId: string, userName: string): BreadcrumbItem[] => [
    {
        title: 'Users',
        href: '/admin/users',
    },
    {
        title: userName,
        href: `/admin/users/${userId}`,
    },
];

export default function Show({ user }: { user: User }) {
    // Get formatted role name
    const getRoleName = (role: string) => {
        switch (role) {
            case 'business_admin':
                return 'Business Admin';
            case 'receptionist':
                return 'Receptionist';
            case 'agent':
                return 'Agent';
            default:
                return role.charAt(0).toUpperCase() + role.slice(1);
        }
    };

    // Get role badge styling
    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'business_admin':
                return <Badge className="border-none bg-blue-100 text-blue-800 hover:bg-blue-100">Admin</Badge>;
            case 'receptionist':
                return <Badge className="border-none bg-purple-100 text-purple-800 hover:bg-purple-100">Receptionist</Badge>;
            case 'agent':
                return <Badge className="border-none bg-green-100 text-green-800 hover:bg-green-100">Agent</Badge>;
            default:
                return <Badge className="border-none bg-gray-100 text-gray-800 hover:bg-gray-100">{role}</Badge>;
        }
    };

    // Get user initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Format address for display
    const formatAddress = () => {
        let addressParts = [];
        if (user.address) addressParts.push(user.address);
        if (user.city) addressParts.push(user.city);

        let regionParts = [];
        if (user.state) regionParts.push(user.state);
        if (user.postal_code) regionParts.push(user.postal_code);

        if (regionParts.length) addressParts.push(regionParts.join(' '));
        if (user.country) addressParts.push(user.country);

        return addressParts.join(', ') || 'No address provided';
    };

    return (
        <AppLayout breadcrumbs={getBreadcrumbs(user.id.toString(), user.name)}>
            <Head title={`User: ${user.name}`} />

            <div className="container max-w-6xl space-y-6 p-6 py-6">
                {/* Header actions */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/admin/users">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Users
                            </Link>
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="lg" asChild>
                            <Link href={`/admin/users/edit/${user.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* User profile card */}
                    <Card className="md:col-span-1">
                        <CardHeader className="pb-4 text-center">
                            <div className="flex flex-col items-center">
                                <Avatar className="mb-3 h-24 w-24">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-xl">{user.name}</CardTitle>
                                <div className="mt-1">{getRoleBadge(user.role)}</div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                <span className="truncate text-sm">{user.email}</span>
                            </div>

                            {user.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                    <span className="text-sm">{user.phone}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Shield className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                <span className="text-sm">{getRoleName(user.role)}</span>
                            </div>

                            {user.business_id && (
                                <div className="flex items-center gap-3">
                                    <Building className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                    <span className="text-sm">Business ID: {user.business_id}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <div className={`h-4 w-4 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'} flex-shrink-0`} />
                                <span className="text-sm">{user.active ? 'Active Account' : 'Inactive Account'}</span>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-center border-t pt-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/users/edit/${user.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* User details tabs */}
                    <div className="md:col-span-2">
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="activity">Activity</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-6 pt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg">
                                            <UserIcon className="text-primary mr-2 h-5 w-5" />
                                            Personal Information
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        {/* Address information */}
                                        <div>
                                            <h3 className="mb-2 flex items-center text-sm font-medium">
                                                <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                                                Address
                                            </h3>
                                            <p className="text-muted-foreground text-sm">{formatAddress()}</p>
                                        </div>

                                        <Separator />

                                        {/* Locale & Timezone */}
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <h3 className="mb-2 flex items-center text-sm font-medium">
                                                    <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                                                    Locale
                                                </h3>
                                                <p className="text-muted-foreground text-sm">{user.locale || 'Not set'}</p>
                                            </div>

                                            <div>
                                                <h3 className="mb-2 flex items-center text-sm font-medium">
                                                    <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                                                    Timezone
                                                </h3>
                                                <p className="text-muted-foreground text-sm">{user.timezone || 'Not set'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg">
                                            <Shield className="text-primary mr-2 h-5 w-5" />
                                            System Information
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
                                            <div>
                                                <h3 className="text-sm font-medium">User ID</h3>
                                                <p className="text-muted-foreground text-sm">#{user.id}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium">Account Status</h3>
                                                <div className="mt-1 flex items-center gap-2">
                                                    {user.active ? (
                                                        <>
                                                            <Badge className="border-none bg-green-100 text-green-800 hover:bg-green-100">
                                                                <Check className="mr-1 h-3 w-3" /> Active
                                                            </Badge>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Badge className="border-none bg-red-100 text-red-800 hover:bg-red-100">
                                                                <X className="mr-1 h-3 w-3" /> Inactive
                                                            </Badge>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium">Role</h3>
                                                <p className="text-muted-foreground text-sm">{getRoleName(user.role)}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium">Business ID</h3>
                                                <p className="text-muted-foreground text-sm">{user.business_id || 'None'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="activity" className="pt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-muted-foreground flex flex-col items-center justify-center py-8 text-center">
                                            <Clock className="mb-2 h-10 w-10 opacity-20" />
                                            <p>Activity log not available</p>
                                            <p className="text-sm">User activity tracking can be enabled in system settings</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
