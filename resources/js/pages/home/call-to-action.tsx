import { Button } from '@/components/ui/button';

const CallToAction = () => {
    return (
        <div>
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
        </div>
    );
};

export default CallToAction;
