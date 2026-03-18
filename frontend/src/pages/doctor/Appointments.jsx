import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/appointments/');
      setAppointments(response.data);
    } catch (error) {
      toast.error('Failed to load schedule.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.patch(`/appointments/appointments/${id}/`, { status: newStatus });
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      ));
      toast.success(`Appointment marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.patient?.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.patient?.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center">
            <Calendar className="w-8 h-8 text-blue-600 mr-2" />
            My Appointments
          </h1>
          <p className="text-slate-600 mt-2">Manage your daily patient queue and requests.</p>
        </div>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading patients...</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                <th className="py-4 px-6 font-semibold">Patient</th>
                <th className="py-4 px-6 font-semibold">Date & Time</th>
                <th className="py-4 px-6 font-semibold">Reason for Visit</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(apt => (
                  <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">
                        {apt.patient?.user?.first_name} {apt.patient?.user?.last_name}
                      </div>
                      <div className="text-sm text-slate-500">{apt.patient?.user?.email}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        {apt.appointment_date}
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />
                        {apt.appointment_time}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 italic text-sm max-w-xs truncate">
                      {apt.reason || 'Not specified'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border
                        ${apt.status === 'confirmed' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 
                          apt.status === 'completed' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                          apt.status === 'cancelled' ? 'text-red-700 bg-red-50 border-red-200' : 
                          'text-amber-700 bg-amber-50 border-amber-200'}`}
                      >
                        {apt.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                        <div className="flex justify-end gap-2">
                          {apt.status !== 'confirmed' && (
                            <button 
                              onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                              className="p-2 text-emerald-600 bg-emerald-50 rounded bg-hover:emerald-100 transition tooltip"
                              title="Confirm"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleStatusUpdate(apt.id, 'cancelled')}
                            className="p-2 text-red-600 bg-red-50 rounded bg-hover:red-100 transition tooltip"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                          {apt.status === 'confirmed' && (
                            <button 
                              onClick={() => handleStatusUpdate(apt.id, 'completed')}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;