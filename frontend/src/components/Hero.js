import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/hero-dairy-farm.jpg';
import { ShieldCheck, Truck, Award, ArrowRight } from 'lucide-react';

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-[600px] lg:h-[85vh] flex items-center py-16 md:py-0"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/70 to-transparent"></div>
      <div className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight animate-fade-in">
            Fresh Dairy <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">
              Delivered Daily
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed drop-shadow-lg">
            Experience the purest taste of farm-fresh dairy products, delivered straight from our organic farm to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/products')}
              className="group bg-white text-green-800 font-bold rounded-xl px-8 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 font-bold rounded-xl px-8 py-4 hover:bg-white hover:text-green-800 transition-all duration-200"
            >
              Learn More
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 mt-16">
            {[
              { icon: ShieldCheck, text: '100% Organic' },
              { icon: Truck, text: 'Fresh Delivery' },
              { icon: Award, text: 'Premium Quality' }
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <Icon className="h-6 w-6 text-green-300" />
                <span className="font-semibold text-white tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

