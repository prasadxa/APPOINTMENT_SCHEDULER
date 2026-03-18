import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Database, PieChart, Activity, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Control Panel</h1>
        <p className="text-slate-600">System overview and management tools.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium">Total Patients</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">1,248</p>
            </div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-lg"><Users className="w-6 h-6"/></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium">Total Doctors</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">84</p>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg"><UserPlus className="w-6 h-6"/></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium">Appointments</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">3,492</p>
            </div>
            <div className="bg-purple-50 text-purple-600 p-3 rounded-lg"><Activity className="w-6 h-6"/></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium">Revenue</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">$45.2K</p>
            </div>
            <div className="bg-amber-50 text-amber-600 p-3 rounded-lg"><PieChart className="w-6 h-6"/></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/doctors" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Manage Doctors</h3>
          <p className="text-slate-500 text-sm">Add, remove, or modify doctor accounts & specialties.</p>
        </Link>
        <Link to="/admin/patients" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Manage Patients</h3>
          <p className="text-slate-500 text-sm">Monitor patient records and system access.</p>
        </Link>
        <Link to="/admin/appointments" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <h3 className="text-lg font-bold text-slate-900 mb-1">All Appointments</h3>
          <p className="text-slate-500 text-sm">System-wide view of all scheduling activity.</p>
        </Link>
        <Link to="/admin/reports" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Financial Reports</h3>
          <p className="text-slate-500 text-sm">Track payments, refunds, and hospital revenue.</p>
        </Link>
        <Link to="/departments" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Departments</h3>
          <p className="text-slate-500 text-sm">Add or edit hospital divisions (e.g. Cardiology).</p>
        </Link>
        <Link to="/admin/settings" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <h3 className="text-lg font-bold text-slate-900 mb-1">System Settings</h3>
          <p className="text-slate-500 text-sm">Configure branch locations and global rules.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
