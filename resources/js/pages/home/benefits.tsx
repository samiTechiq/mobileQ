import { Badge, CheckCircle } from 'lucide-react';

const Benefits = () => {
    return (
        <>
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
                            <img src="https://placehold.co/800x600" alt="Queue Management Benefits" className="h-auto w-full" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Benefits;
