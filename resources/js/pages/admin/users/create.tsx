import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: '/admin/users/create',
    },
];

type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
};

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<UserForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'agent', // Default role
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <div className="h-full w-full bg-gray-50">
                <div className="mx-auto w-full px-4 py-8 sm:px-6">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" asChild>
                                <Link href="/admin/users">
                                    <ChevronLeft className="h-5 w-5" />
                                    <span className="ml-1">Users</span>
                                </Link>
                            </Button>
                        </div>
                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">Create User</h1>
                        <p className="mt-2 text-sm text-gray-500">Create a new user account and assign appropriate permissions</p>
                    </div>

                    {/* Main content */}
                    <div className="rounded-lg bg-white shadow-sm">
                        <form onSubmit={handleSubmit}>
                            <Tabs defaultValue="details" className="w-full">
                                <div className="border-b border-gray-200 px-6 pt-6">
                                    <TabsList className="mb-0 grid w-full grid-cols-2">
                                        <TabsTrigger
                                            value="details"
                                            className="data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2"
                                        >
                                            Account Details
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="permissions"
                                            className="data-[state=active]:border-primary rounded-none data-[state=active]:border-b-2"
                                        >
                                            Role & Permissions
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="details" className="p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                autoComplete="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={processing}
                                                placeholder="Enter user's full name"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.name} className="mt-1" />
                                        </div>

                                        <div>
                                            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                disabled={processing}
                                                placeholder="user@example.com"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.email} className="mt-1" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                    Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    autoComplete="new-password"
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    disabled={processing}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError message={errors.password} className="mt-1" />
                                            </div>

                                            <div>
                                                <Label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    required
                                                    autoComplete="new-password"
                                                    value={data.password_confirmation}
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    disabled={processing}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError message={errors.password_confirmation} className="mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="permissions" className="p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                User Role
                                            </Label>
                                            <Select value={data.role} onValueChange={(value) => setData('role', value)} disabled={processing}>
                                                <SelectTrigger className="mt-1 w-full">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="business_admin">Business Admin</SelectItem>
                                                    <SelectItem value="receptionist">Receptionist</SelectItem>
                                                    <SelectItem value="agent">Agent</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {data.role === 'business_admin' &&
                                                    'Has full access to all system features and can manage other users.'}
                                                {data.role === 'receptionist' &&
                                                    'Can manage appointments, check-ins, and basic customer interactions.'}
                                                {data.role === 'agent' && 'Has limited access to assigned customers and related actions only.'}
                                            </p>
                                            <InputError message={errors.role} className="mt-1" />
                                        </div>
                                    </div>
                                </TabsContent>

                                <div className="flex justify-end space-x-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-6 py-4">
                                    <Button variant="outline" type="button" disabled={processing} asChild>
                                        <Link href="/admin/users">Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            'Create User'
                                        )}
                                    </Button>
                                </div>
                            </Tabs>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
