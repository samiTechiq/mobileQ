const Statistic = () => {
    return (
        <>
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
        </>
    );
};

export default Statistic;
