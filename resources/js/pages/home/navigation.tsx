import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const Navigation = () => {
    return (
        <>
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
        </>
    );
};

export default Navigation;
