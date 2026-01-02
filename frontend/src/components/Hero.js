import React from 'react';
import heroBg from '../assets/hero-dairy-farm.jpg';
import { ShieldCheck, Truck, Award, ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section
      className="relative min-h-[600px] lg:h-[85vh] flex items-center py-16 md:py-0"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/60 to-transparent"></div>
      <div className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto">
        <h1 className="text-white font-bold text-4xl md:text-6xl mb-6 leading-tight drop-shadow-md">
          Fresh Dairy <br className="hidden md:block" />Delivered Daily
        </h1>
        <p className="text-white text-base md:text-xl mb-10 max-w-xl drop-shadow">
          Experience the purest taste of farm-fresh dairy products, delivered straight from our organic farm to your doorstep.
        </p>
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <button className="bg-white text-green-800 font-bold rounded-lg px-8 py-4 shadow-lg border-2 border-transparent hover:bg-green-50 transition w-full md:w-auto flex items-center justify-center">
            Shop Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button className="bg-transparent text-white border-2 border-white font-bold rounded-lg px-8 py-4 hover:bg-white hover:text-green-800 transition w-full md:w-auto">
            Learn More
          </button>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 mt-16 text-white/90">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6" />
            <span className="font-medium tracking-wide">100% Organic</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="h-6 w-6" />
            <span className="font-medium tracking-wide">Fresh Delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6" />
            <span className="font-medium tracking-wide">Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
