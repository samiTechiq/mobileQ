import { Badge } from 'lucide-react';

const HowItWork = () => {
    return (
        <>
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
        </>
    );
};

export default HowItWork;
