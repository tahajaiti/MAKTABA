import React from 'react';
import {  ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between bg-gradient-to-br from-dun to-jet'>

            <section className='relative overflow-hidden py-32 px-24'>
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
                    Where Knowledge
                    <span className="block text-jet">Meets Innovation</span>
                </h1>
                <p className="text-xl leading-relaxed mb-12 text-night">
                    Experience the future of reading with our curated collection of digital resources.
                    Seamlessly browse through thousands of titles designed to inspire and educate.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link to='/books' className="group flex items-center gap-3 bg-jet text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-jet transition-all duration-300">
                        Explore Library
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to='/register' className="group flex items-center gap-3 border-2 border-jet px-8 py-4 rounded-lg text-lg font-medium hover:bg-jet hover:text-white transition-all duration-300">
                        Join us
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-b from-night to-jet">
                <div className="container mx-auto px-6 flex flex-col gap-10">
                    <h2 className="text-4xl md:text-5xl font-bold max-w-lg text-center mx-auto">
                        Crafted for the Modern Reader
                    </h2>
                    <h2 className="text-2xl md:text-3xl font-bold max-w-lg text-center mx-auto">
                        Enjoy the best reading experience
                    </h2>
                </div>
            </section>

            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-jet">
                    <div className="absolute inset-0 bg-gradient-to-br from-jet to-transparent opacity-10"></div>
                </div>
                <div className="container relative mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                        Start Your Reading Journey
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg mb-12 text-[oklch(92.19%_0_0)] opacity-90">
                        Join our community and get access to unlmited books for free.
                    </p>
                    <button className="group inline-flex items-center gap-3 bg-white text-jet px-8 py-4 rounded-lg text-lg font-medium hover:bg-dun transition-all duration-300">
                        Join Now
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Home;