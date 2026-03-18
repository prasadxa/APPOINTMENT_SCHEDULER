import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, FileText } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // In a real app we would have an endpoint specifically for the logged in patient
      const response = await api.get('/appointments/appointments/');
      setAppointments(response.data);
    } catch (error) {
      toast.error('Failed to load appointments.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'cancelled': return 'text-red-700 bg-red-50 border-red-200';
      case 'completed': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <Activity className="w-8 h-8 text-blue-600 mr-3" />
          My Appointments
        </h1>
        <p className="text-slate-600 mt-2">View your upcoming visits and past medical history.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading your appointments...</div>
      ) : (
        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-slate-100">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No Appointments Found</h3>
              <p className="text-slate-500 mt-1">You do not have any scheduled or past appointments.</p>
            </div>
          ) : (
            appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition">
                
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 text-blue-600 p-4 rounded-full flex-shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Dr. {apt.doctor?.user?.first_name} {apt.doctor?.user?.last_name}
                    </h3>
                    <p className="text-slate-500 text-sm">{apt.doctor?.department?.name || 'General Route'}</p>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                        {apt.appointment_date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-slate-400" />
                        {apt.appointment_time}
                      </span>
                    </div>

                    {apt.reason && (
                      <div className="mt-3 text-sm text-slate-600 flex items-start">
                        <FileText className="w-4 h-4 mr-1 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="italic">"{apt.reason}"</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${getStatusColor(apt.status)}`}>
                    {apt.status || 'Pending'}
                  </span>
                  
                  {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                    <button className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium transition">
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;