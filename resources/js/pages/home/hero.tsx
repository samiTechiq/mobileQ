import { Button } from '@/components/ui/button';
import { Badge, ChevronRight } from 'lucide-react';

const Hero = () => {
    return (
        <>
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
                        <img src="https://placehold.co/800x600" alt="Queue Management Dashboard" className="h-auto w-full" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
