import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Trash2, User as UserIcon } from 'lucide-react';

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
    {
        title: 'Delete',
        href: `/admin/users/${userId}/delete`,
    },
];

export default function DeleteConfirmation({ user }: { user: User }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(`/admin/users/destroy/${user.id}`, {
            onSuccess: () => {
                // Redirect is handled by the controller
            },
        });
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

    return (
        <AppLayout breadcrumbs={getBreadcrumbs(user.id.toString(), user.name)}>
            <Head title={`Delete User: ${user.name}`} />

            <div className="container mx-auto w-full p-6">
                <Card className="border-destructive/30 shadow-md">
                    <CardHeader className="bg-muted/30 space-y-1 border-b pt-7 pb-7">
                        <div className="text-destructive mb-4 flex items-center justify-center">
                            <div className="bg-destructive/10 rounded-full p-3">
                                <Trash2 className="h-8 w-8" />
                            </div>
                        </div>
                        <CardTitle className="text-destructive text-center text-xl font-bold">Delete User Account</CardTitle>
                        <CardDescription className="pt-1 text-center">You are about to delete this user account</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <Alert variant="destructive" className="mb-6">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Warning: This action cannot be undone</AlertTitle>
                            <AlertDescription>
                                Once you delete this user account, all associated data will be permanently removed from the system. This action cannot
                                be reversed.
                            </AlertDescription>
                        </Alert>

                        <div className="border-muted rounded-lg border p-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary">{getInitials(user.name)}</AvatarFallback>
                                </Avatar>

                                <div className="space-y-1">
                                    <h3 className="leading-none font-medium">{user.name}</h3>
                                    <p className="text-muted-foreground text-sm">{user.email}</p>
                                    <div className="text-muted-foreground flex items-center text-xs">
                                        <UserIcon className="mr-1 h-3 w-3" />
                                        <span>{user.role}</span>
                                        {user.active ? (
                                            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2 text-sm">
                            <h4 className="font-medium">The following data will be permanently deleted:</h4>
                            <ul className="text-muted-foreground list-inside list-disc space-y-1">
                                <li>User profile and personal information</li>
                                <li>Access permissions and role assignments</li>
                                <li>Login credentials and authentication data</li>
                                <li>Any content, activity logs, or records created by this user</li>
                            </ul>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-3 border-t pt-6 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-3">
                        <Button variant="outline" className="w-full sm:w-auto" asChild>
                            <Link href={`/admin/users/${user.id}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Cancel
                            </Link>
                        </Button>

                        <Button variant="destructive" className="w-full sm:w-auto" onClick={handleDelete} disabled={processing}>
                            {processing ? (
                                <>Deleting...</>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Permanently Delete User
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
