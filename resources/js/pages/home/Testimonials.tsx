import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Testimonials = () => {
    return (
        <>
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
                                        <img src="https://placehold.co/64x64" alt="Profile" className="h-12 w-12 rounded-full" />
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
                                        <img src="https://placehold.co/64x64" alt="Profile" className="h-12 w-12 rounded-full" />
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
                                        <img src="https://placehold.co/64x64" alt="Profile" className="h-12 w-12 rounded-full" />
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
        </>
    );
};

export default Testimonials;
