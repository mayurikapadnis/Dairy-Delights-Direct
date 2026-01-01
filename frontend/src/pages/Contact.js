import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function Contact() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-16 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
        <p className="mb-8 text-lg text-gray-600">
          Have questions about our products or want to visit our farm? We'd love to hear from you.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded shadow-lg md:w-2/3 p-8">
          {/* Contact Information */}
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
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
