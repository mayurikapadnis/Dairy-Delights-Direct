import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function ContactInfo() {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h3>
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <MapPin className="h-6 w-6 text-green-700 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
            <p className="text-gray-600">
              123 Farm Road, Green Valley<br />
              Maharashtra, India 411001
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Phone className="h-6 w-6 text-green-700 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
            <p className="text-gray-600">+91 98765 43210</p>
            <p className="text-gray-600">+91 87654 32109</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Mail className="h-6 w-6 text-green-700 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
            <p className="text-gray-600">info@freshdairy.com</p>
            <p className="text-gray-600">orders@freshdairy.com</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Clock className="h-6 w-6 text-green-700 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
            <p className="text-gray-600">Monday - Saturday: 6:00 AM - 8:00 PM</p>
            <p className="text-gray-600">Sunday: 7:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
