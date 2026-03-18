import React, { useState } from 'react';
import { Download, PieChart, TrendingUp, Users, Activity, Filter, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const Reports = () => {
  const [filter, setFilter] = useState('This Month');

  const exportReport = () => {
    toast.success('Report exported to PDF successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">Analytics & Reporting</h1>
          <p className="text-slate-600 mt-2">Comprehensive data overview for hospital administration.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          <button 
            onClick={exportReport}
            className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-sm"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <p className="text-slate-500 font-medium">Total Income</p>
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg"><TrendingUp className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900">$124,500</p>
              <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
                +14.2% <span className="text-slate-400">vs last period</span>
              </p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <p className="text-slate-500 font-medium">New Patients</p>
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg"><Users className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900">482</p>
              <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
                +8.1% <span className="text-slate-400">vs last period</span>
              </p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <p className="text-slate-500 font-medium">Appointments Handled</p>
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><Activity className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900">1,209</p>
              <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                -2.4% <span className="text-slate-400">vs last period</span>
              </p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <p className="text-slate-500 font-medium">Pending Consults</p>
                <div className="bg-amber-50 text-amber-600 p-2 rounded-lg"><Calendar className="w-5 h-5"/></div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900">64</p>
              <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                Requires immediate action
              </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <PieChart className="w-6 h-6 mr-2 text-blue-600" />
              Department Breakdown
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Full Specs</button>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex justify-between text-sm mb-1 text-slate-700">
                <span>Cardiology</span>
                <span className="font-semibold text-slate-900">45%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between text-sm mb-1 text-slate-700">
                <span>Orthopedics</span>
                <span className="font-semibold text-slate-900">25%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between text-sm mb-1 text-slate-700">
                <span>Pediatrics</span>
                <span className="font-semibold text-slate-900">20%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between text-sm mb-1 text-slate-700">
                <span>Neurology</span>
                <span className="font-semibold text-slate-900">10%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Recent System Activity
            </h2>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="bg-slate-100 rounded-full w-2 h-2 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Dr. Sarah Connor joined the platform</p>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-slate-100 rounded-full w-2 h-2 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Payment #1002 cleared successfully ($150.00)</p>
                <p className="text-xs text-slate-500">5 hours ago</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-slate-100 rounded-full w-2 h-2 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Admin generated Monthly Financial Report</p>
                <p className="text-xs text-slate-500">Yesterday</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-slate-100 rounded-full w-2 h-2 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">System backup completed (14.2 GB)</p>
                <p className="text-xs text-slate-500">Yesterday</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;