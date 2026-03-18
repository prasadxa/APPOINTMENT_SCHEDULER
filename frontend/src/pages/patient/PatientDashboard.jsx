import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CreditCard, User, History } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const PatientDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Patient Dashboard</h1>
        <p className="text-slate-600">Welcome back, {user?.first_name || 'Patient'}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/doctors" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Book Appointment</h3>
          <p className="text-slate-500 text-sm">Search for doctors and book a new consultation instantly.</p>
        </Link>

        <Link to="/patient/history" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Appointment History</h3>
          <p className="text-slate-500 text-sm">View past and upcoming schedules, and manage reschedules.</p>
        </Link>
        
        <Link to="/patient/payments" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <CreditCard className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Payments & Invoices</h3>
          <p className="text-slate-500 text-sm">Pay consultation fees online safely and view past receipts.</p>
        </Link>

        <Link to="/patient/profile" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col items-center text-center group">
          <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <User className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">My Profile</h3>
          <p className="text-slate-500 text-sm">Manage personal details, viewing permissions, and medical history.</p>
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;
