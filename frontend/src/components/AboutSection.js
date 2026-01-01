import React from 'react';
import { Award, Users, Leaf, Heart } from 'lucide-react';

function AboutSection() {
  // Features with corresponding Lucide icons
  const features = [
    {
      icon: <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />,
      title: "Premium Quality",
      desc: "Award-winning products with guaranteed freshness",
    },
    {
      icon: <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />,
      title: "Family Owned",
      desc: "Three generations of dairy farming expertise",
    },
    {
      icon: <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />,
      title: "100% Organic",
      desc: "Certified organic with sustainable practices",
    },
    {
      icon: <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />,
      title: "Animal Welfare",
      desc: "Ethical treatment and happy, healthy cows",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2">About FreshDairy</h2>
        <p className="mb-8 text-lg text-gray-600">
          For over three generations, we've been committed to bringing you the finest dairy products, sourced from our family farms and crafted with traditional methods.
        </p>
      </div>
      {/* Feature grid cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8 text-center">
        {features.map((f) => (
          <div key={f.title} className="bg-gray-50 rounded-lg p-8 shadow flex flex-col items-center">
            {f.icon}
            <h3 className="font-bold text-xl mb-1">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
      {/* Our Story section */}
      <div className="max-w-4xl mx-auto mt-14 text-left px-8">
        <h3 className="text-2xl font-bold mb-2">Our Story</h3>
        <p className="mb-2">
          Founded in 1952, FreshDairy began as a small family farm with just a handful of cows. Today, we've grown into a trusted name in organic dairy, but our values remain unchanged: quality, sustainability, and community.
        </p>
        <p>
          We believe that the best dairy products come from happy, healthy animals raised in natural environments. That's why we maintain the highest standards of animal welfare and use only organic, sustainable farming practices.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
