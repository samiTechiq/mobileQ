import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, CheckCircle } from 'lucide-react';

const Pricing = () => {
    return (
        <div>
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
        </div>
    );
};

export default Pricing;
