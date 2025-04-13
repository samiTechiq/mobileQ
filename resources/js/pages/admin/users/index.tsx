import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, Edit2, EyeIcon, Filter, PlusCircle, Search, Trash2, UserCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
    },
];

export default function Index({ users }: { users: User[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter users based on search query
    const filteredUsers = searchQuery
        ? users.filter(
              (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : users;

    // Get user initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header section */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                        <p className="text-muted-foreground">Manage user accounts and permissions</p>
                    </div>
                    <Link href="/admin/users/create">
                        <Button className="w-full sm:w-auto">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </Link>
                </div>

                {/* Search and filter bar */}
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search users..."
                            className="w-full pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-9">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuItem>All Users</DropdownMenuItem>
                                <DropdownMenuItem>Admins Only</DropdownMenuItem>
                                <DropdownMenuItem>Receptionists Only</DropdownMenuItem>
                                <DropdownMenuItem>Agents Only</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Users table */}
                <Card className="overflow-hidden border-none shadow-sm">
                    <CardHeader className="bg-muted/40 px-6 py-4">
                        <CardTitle className="text-base font-medium">Users ({filteredUsers.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-muted/20">
                                <TableRow>
                                    <TableHead className="w-16">ID</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead className="hidden md:table-cell">Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="hover:bg-muted/40 transition-colors">
                                            <TableCell className="font-medium">{user.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8 border">
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                            {getInitials(user.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-muted-foreground text-xs md:hidden">{user.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/users/${user.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <EyeIcon className="h-4 w-4" />
                                                            <span className="sr-only">View</span>
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/users/edit/${user.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Edit2 className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/users/delete/${user.id}`}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive h-8 w-8"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Delete</span>
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <UserCircle className="text-muted-foreground/60 h-8 w-8" />
                                                <p className="text-muted-foreground">No users found</p>
                                                {searchQuery && (
                                                    <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                                                        Clear search
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
