import React from 'react';
function Features() {
  return (
    <div className="flex justify-center space-x-10 py-8 bg-white">
      <div className="flex items-center space-x-2 text-green-700 font-semibold">
        <span className="material-icons">verified</span>
        <span>100% Organic</span>
      </div>
      <div className="flex items-center space-x-2 text-green-700 font-semibold">
        <span className="material-icons">local_shipping</span>
        <span>Fresh Delivery</span>
      </div>
      <div className="flex items-center space-x-2 text-green-700 font-semibold">
        <span className="material-icons">star</span>
        <span>Premium Quality</span>
      </div>
    </div>
  );
}
export default Features;
