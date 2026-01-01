import React from 'react';
import heroBg from '../assets/hero-dairy-farm.jpg';
import { ShieldCheck, Truck, Award } from 'lucide-react';

function Hero() {
  return (
    <section
      className="relative h-[450px] flex items-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-40"></div>
      <div className="relative z-10 px-16">
        <h1 className="text-white font-bold text-5xl mb-4">
          Fresh Dairy <br />Delivered Daily
        </h1>
        <p className="text-white text-lg mb-8">
          Experience the purest taste of farm-fresh dairy products, delivered straight from our organic farm to your doorstep.
        </p>
        <div className="flex space-x-4">
          <button className="bg-white text-green-700 font-semibold rounded px-8 py-3 shadow border hover:bg-green-50 transition">
            Shop Now
          </button>
          <button className="bg-transparent text-white border border-white font-semibold rounded px-8 py-3 hover:bg-white hover:text-green-700 transition">
            Learn More
          </button>
        </div>
        <div className="flex space-x-12 mt-12">
          <div className="text-white flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-white" />
            <span>100% Organic</span>
          </div>
          <div className="text-white flex items-center space-x-2">
            <Truck className="h-6 w-6 text-white" />
            <span>Fresh Delivery</span>
          </div>
          <div className="text-white flex items-center space-x-2">
            <Award className="h-6 w-6 text-white" />
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
