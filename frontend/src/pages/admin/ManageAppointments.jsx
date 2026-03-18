import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/appointments/');
      setAppointments(response.data);
    } catch (error) {
      toast.error('Failed to grab platform appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/appointments/appointments/${id}/`, { status: newStatus });
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      ));
      toast.success(`Globally marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to change appointment status');
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const filtered = appointments.filter(apt => {
    const matchesSearch = 
      apt.patient?.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor?.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patient?.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor?.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filterStatus === 'All') return matchesSearch;
    return matchesSearch && apt.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <CalendarIcon className="w-8 h-8 text-blue-600 mr-3" />
            Global Appointments
          </h1>
          <p className="text-slate-600 mt-1">Administer all patient bookings across all departments.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading master schedule...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                  <th className="py-4 px-6 font-semibold">Date & Time</th>
                  <th className="py-4 px-6 font-semibold">Patient</th>
                  <th className="py-4 px-6 font-semibold">Assigned Doctor</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map(apt => (
                    <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{apt.appointment_date}</div>
                        <div className="text-sm text-slate-500">{apt.appointment_time}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">
                          {apt.patient?.user?.first_name} {apt.patient?.user?.last_name}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[150px]">
                          {apt.reason || 'No reason specified'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-blue-700">
                          Dr. {apt.doctor?.user?.first_name} {apt.doctor?.user?.last_name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {apt.doctor?.department?.name || 'General'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${getStatusColor(apt.status)}`}>
                          {apt.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          {apt.status !== 'cancelled' && (
                            <button 
                              onClick={() => handleStatusChange(apt.id, 'cancelled')}
                              className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-sm font-medium transition"
                            >
                              Force Cancel
                            </button>
                          )}
                          {(apt.status === 'pending' || apt.status === 'cancelled') && (
                            <button 
                              onClick={() => handleStatusChange(apt.id, 'confirmed')}
                              className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-sm font-medium transition"
                            >
                              Confirm
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-500">
                      No appointments match your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;