import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bell, CheckCircle, ChevronRight, Clock, Printer, Users } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Navigation */}
            <nav className="container mx-auto flex items-center justify-between px-4 py-6">
                <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-indigo-600" />
                    <span className="text-2xl font-bold text-gray-900">mobileQ</span>
                </div>
                <div className="hidden space-x-6 md:flex">
                    <a href="#features" className="text-gray-600 transition-colors hover:text-indigo-600">
                        Features
                    </a>
                    <a href="#benefits" className="text-gray-600 transition-colors hover:text-indigo-600">
                        Benefits
                    </a>
                    <a href="#testimonials" className="text-gray-600 transition-colors hover:text-indigo-600">
                        Testimonials
                    </a>
                    <a href="#pricing" className="text-gray-600 transition-colors hover:text-indigo-600">
                        Pricing
                    </a>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="hidden md:inline-flex">
                        Log in
                    </Button>
                    <Button>Get Started</Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto flex flex-col items-center px-4 py-16 md:flex-row md:py-24">
                <div className="mb-10 md:mb-0 md:w-1/2 md:pr-10">
                    <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Multi-tenant Solution</Badge>
                    <h1 className="mb-6 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl">
                        Transform your customer waiting experience
                    </h1>
                    <p className="mb-8 text-xl text-gray-600">
                        mobileQ helps businesses manage customer queues efficiently, reduce wait times, and improve customer satisfaction.
                    </p>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Button size="lg" className="font-medium">
                            Start Free Trial <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="font-medium">
                            Book a Demo
                        </Button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl">
                        <img src="/api/placeholder/800/600" alt="Queue Management Dashboard" className="h-auto w-full" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-indigo-600 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 text-white md:grid-cols-3">
                        <div className="text-center">
                            <p className="mb-2 text-4xl font-bold">30%</p>
                            <p className="text-lg opacity-90">Reduction in wait times</p>
                        </div>
                        <div className="text-center">
                            <p className="mb-2 text-4xl font-bold">500+</p>
                            <p className="text-lg opacity-90">Businesses served</p>
                        </div>
                        <div className="text-center">
                            <p className="mb-2 text-4xl font-bold">90%</p>
                            <p className="text-lg opacity-90">Customer satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

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

            {/* How It Works */}
            <section className="bg-gray-50 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Process</Badge>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">How mobileQ works</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">A simple process that transforms your customer service workflow</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                        <div className="relative rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                                1
                            </div>
                            <h3 className="mt-4 mb-3 text-xl font-bold text-gray-900">Customer Arrival</h3>
                            <p className="text-gray-600">
                                Receptionist registers the customer in the system and assigns them to the appropriate queue.
                            </p>
                        </div>

                        <div className="relative rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                                2
                            </div>
                            <h3 className="mt-4 mb-3 text-xl font-bold text-gray-900">Agent Assignment</h3>
                            <p className="text-gray-600">The system assigns the customer to an available agent based on service type and priority.</p>
                        </div>

                        <div className="relative rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                                3
                            </div>
                            <h3 className="mt-4 mb-3 text-xl font-bold text-gray-900">Service Delivery</h3>
                            <p className="text-gray-600">
                                Agents receive notifications and serve customers efficiently with all relevant information at hand.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="container mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="mb-10 md:mb-0 md:w-1/2 md:pr-10">
                        <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Benefits</Badge>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Why businesses choose mobileQ</h2>
                        <div className="space-y-6">
                            <div className="flex">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-xl font-medium text-gray-900">Reduced wait times</h3>
                                    <p className="mt-1 text-gray-600">
                                        Optimize customer flow and reduce perceived wait times with efficient queue management.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-xl font-medium text-gray-900">Improved staff productivity</h3>
                                    <p className="mt-1 text-gray-600">
                                        Balanced workload distribution ensures optimal staff utilization and productivity.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-xl font-medium text-gray-900">Enhanced customer experience</h3>
                                    <p className="mt-1 text-gray-600">
                                        Professional service delivery with printed tickets and clear expectations improves customer satisfaction.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-xl font-medium text-gray-900">Data-driven decisions</h3>
                                    <p className="mt-1 text-gray-600">
                                        Comprehensive analytics provide insights to optimize staffing, resource allocation, and service offerings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl">
                            <img src="/api/placeholder/800/600" alt="Queue Management Benefits" className="h-auto w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="bg-gray-50 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Testimonials</Badge>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">What our clients say</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Businesses of all sizes trust QueueFlow to manage their customer queues
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <div className="mb-4 flex items-center">
                                    <div className="mr-3">
                                        <img src="/api/placeholder/64/64" alt="Profile" className="h-12 w-12 rounded-full" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                                        <CardDescription>Office Manager, MediCare Clinic</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    "mobileQ has completely transformed how we manage patient flow. Wait times are down by 40% and our staff can focus
                                    on providing quality care instead of managing queues."
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="mb-4 flex items-center">
                                    <div className="mr-3">
                                        <img src="/api/placeholder/64/64" alt="Profile" className="h-12 w-12 rounded-full" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Michael Chang</CardTitle>
                                        <CardDescription>Branch Manager, Pacific Bank</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    "The analytics provided by mobileQ helped us identify peak hours and optimize staffing accordingly. Customer
                                    complaints about wait times have decreased by 65%."
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="mb-4 flex items-center">
                                    <div className="mr-3">
                                        <img src="/api/placeholder/64/64" alt="Profile" className="h-12 w-12 rounded-full" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Lisa Rodriguez</CardTitle>
                                        <CardDescription>Customer Service Director, City Services</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    "Implementing mobileQ across multiple departments was seamless. The multi-tenant capabilities allow us to manage
                                    different service queues while maintaining a unified view."
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="container mx-auto px-4 py-16 md:py-24">
                <div className="mb-16 text-center">
                    <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Pricing</Badge>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Simple, transparent pricing</h2>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">Choose the plan that best fits your business needs</p>
                </div>

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl">Starter</CardTitle>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$49</span>
                                <span className="ml-2 text-gray-600">/month</span>
                            </div>
                            <CardDescription className="mt-2">Perfect for small businesses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Up to 3 service counters</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Basic queue management</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Ticket printing</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Email support</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Get Started</Button>
                        </CardFooter>
                    </Card>

                    <Card className="relative border-indigo-200 shadow-lg">
                        <div className="absolute top-0 left-0 w-full rounded-t-lg bg-indigo-600 py-1 text-center text-sm font-medium text-white">
                            Most Popular
                        </div>
                        <CardHeader className="pt-10">
                            <CardTitle className="text-2xl">Professional</CardTitle>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$99</span>
                                <span className="ml-2 text-gray-600">/month</span>
                            </div>
                            <CardDescription className="mt-2">Ideal for growing businesses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Up to 10 service counters</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Advanced queue management</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Staff performance analytics</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Customer notifications</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Priority support</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl">Enterprise</CardTitle>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$249</span>
                                <span className="ml-2 text-gray-600">/month</span>
                            </div>
                            <CardDescription className="mt-2">For large organizations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Unlimited service counters</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Multi-location support</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Custom integration</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Advanced reporting</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    <span>Dedicated account manager</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">
                                Contact Sales
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to transform your customer service?</h2>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-indigo-100">
                        Join hundreds of businesses that have improved customer satisfaction and optimized their operations with mobileQ.
                    </p>
                    <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                            Start Free Trial
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-indigo-700">
                            Schedule Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 text-gray-300">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <div className="mb-4 flex items-center space-x-2">
                                <Users className="h-6 w-6 text-indigo-400" />
                                <span className="text-xl font-bold text-white">mobileQ</span>
                            </div>
                            <p className="mb-4 text-gray-400">Modern queue management system for businesses of all sizes.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-lg font-medium text-white">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Case Studies
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Testimonials
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-lg font-medium text-white">Support</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Getting Started
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        API Reference
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Contact Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-lg font-medium text-white">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} mobileQ. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
