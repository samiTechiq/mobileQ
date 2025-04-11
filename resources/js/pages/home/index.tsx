import { Head } from '@inertiajs/react';
import Benefits from './benefits';
import CallToAction from './call-to-action';
import Hero from './hero';
import HomeFooter from './home-footer';
import HowItWork from './how-it-work';
import Navigation from './navigation';
import Pricing from './pricing';
import Statistic from './statistic';
import Testimonials from './Testimonials';

const Index = () => {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
                <Navigation />
                <Hero />
                <Statistic />
                <HowItWork />
                <Benefits />
                <Testimonials />
                <Pricing />
                <CallToAction />
                <HomeFooter />
            </div>
        </>
    );
};

export default Index;
