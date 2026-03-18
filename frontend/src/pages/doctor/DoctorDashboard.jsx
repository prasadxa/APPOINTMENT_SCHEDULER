import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Settings, Activity } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const DoctorDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
          <p className="text-slate-600">Welcome, Dr. {user?.last_name || ''}!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/doctor/appointments" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-500 transition group flex items-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-6 group-hover:bg-blue-600 group-hover:text-white transition">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Today's Appointments</h3>
            <p className="text-slate-500 text-sm">View and manage your upcoming patient sessions.</p>
          </div>
        </Link>

        <Link to="/doctor/schedule" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-500 transition group flex items-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mr-6 group-hover:bg-emerald-600 group-hover:text-white transition">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Schedule Management</h3>
            <p className="text-slate-500 text-sm">Update your availability and consultation slots.</p>
          </div>
        </Link>
        
        <Link to="/doctor/patients" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-purple-500 transition group flex items-center">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mr-6 group-hover:bg-purple-600 group-hover:text-white transition">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Patient Records</h3>
            <p className="text-slate-500 text-sm">Review clinical history and consultation notes.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
