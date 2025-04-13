import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    business_name: string;
    business_phone: string;
    business_address: string;
    business_email: string;
};

export default function Register() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        business_name: '',
        business_phone: '',
        business_address: '',
        business_email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="" description="">
            <Head title="Register" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                {/* business information */}

                {step === 1 && (
                    <div className="grid gap-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">Create an business account</h1>
                            <p className="text-muted-foreground text-center text-sm">Enter your details below to create your account</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="business name"
                                value={data.business_name}
                                onChange={(e) => setData('business_name', e.target.value)}
                                disabled={processing}
                                placeholder="Business name"
                            />
                            <InputError message={errors.business_name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="business_email">Business Email address</Label>
                            <Input
                                id="business_email"
                                type="business_email"
                                required
                                tabIndex={2}
                                autoComplete="business_email"
                                value={data.business_email}
                                onChange={(e) => setData('business_email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.business_email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="business_phone">Business Phone</Label>
                            <Input
                                id="business_phone"
                                type="business_phone"
                                required
                                tabIndex={3}
                                autoComplete="new-business_phone"
                                value={data.business_phone}
                                onChange={(e) => setData('business_phone', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.business_phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="business_address">Business Address</Label>
                            <Input
                                id="business_address"
                                type="text"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.business_address}
                                onChange={(e) => setData('business_address', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.business_address} />
                        </div>

                        <button type="button" onClick={() => setStep(2)} className="btn btn-primary mt-2 w-full" tabIndex={5} disabled={processing}>
                            Next step
                        </button>
                    </div>
                )}
                {/* Business Admin information */}
                {step === 2 && (
                    <div className="grid gap-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">Create an administrator account</h1>
                            <p className="text-muted-foreground text-center text-sm">Enter your details below to create your account</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="btn btn-destructive w-full"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                back
                            </button>
                            <button type="submit" className="btn btn-primary w-full" tabIndex={5} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create account
                            </button>
                        </div>
                    </div>
                )}

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
