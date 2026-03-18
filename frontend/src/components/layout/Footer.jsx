import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">HealthHub</h3>
            <p className="text-sm">
              Making healthcare accessible and efficient for everyone through digital innovation.
            </p>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">For Patients</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/doctors" className="hover:text-blue-400 transition">Search Doctors</a></li>
              <li><a href="/login" className="hover:text-blue-400 transition">Book Appointment</a></li>
              <li><a href="/departments" className="hover:text-blue-400 transition">Our Departments</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">For Doctors</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/doctor/login" className="hover:text-blue-400 transition">Provider Login</a></li>
              <li><a href="/careers" className="hover:text-blue-400 transition">Join us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-md font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Healthcare Ave</li>
              <li>City, State 12345</li>
              <li>support@healthhub.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          &copy; {new Date().getFullYear()} HealthHub Appointments. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;