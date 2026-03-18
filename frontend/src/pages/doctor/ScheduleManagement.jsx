import React, { useState } from 'react';
import { Clock, Calendar, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ScheduleManagement = () => {
  const [schedule, setSchedule] = useState({
    monday: { start: '09:00', end: '17:00', available: true },
    tuesday: { start: '09:00', end: '17:00', available: true },
    wednesday: { start: '09:00', end: '17:00', available: true },
    thursday: { start: '09:00', end: '17:00', available: true },
    friday: { start: '09:00', end: '17:00', available: true },
    saturday: { start: '', end: '', available: false },
    sunday: { start: '', end: '', available: false },
  });

  const handleUpdate = (day, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleToggle = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], available: !prev[day].available }
    }));
  };

  const saveSettings = () => {
    // Basic stub save for demonstration
    toast.success('Weekly schedule updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <Calendar className="w-8 h-8 text-blue-600 mr-3"/>
          Manage Schedule
        </h1>
        <p className="text-slate-600 mt-2">Set your weekly availability for patient appointments.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 p-6 flex justify-between items-center bg-slate-50">
          <div className="flex items-center text-slate-700 font-medium">
            <Clock className="w-5 h-5 mr-2 text-slate-400" />
            Default Weekly Hours
          </div>
          <button 
            onClick={saveSettings}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>

        <div className="p-6 space-y-4">
          {Object.keys(schedule).map((day) => (
            <div key={day} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <div className="flex items-center w-1/4">
                <input
                  type="checkbox"
                  checked={schedule[day].available}
                  onChange={() => handleToggle(day)}
                  className="w-5 h-5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 mr-4"
                />
                <span className="font-semibold text-slate-700 capitalize">
                  {day}
                </span>
              </div>

              {schedule[day].available ? (
                <div className="flex items-center gap-4 flex-1 justify-end">
                  <div className="flex flex-col">
                    <label className="text-xs text-slate-500 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={schedule[day].start}
                      onChange={(e) => handleUpdate(day, 'start', e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-slate-400 mt-4">-</span>
                  <div className="flex flex-col">
                    <label className="text-xs text-slate-500 mb-1">End Time</label>
                    <input
                      type="time"
                      value={schedule[day].end}
                      onChange={(e) => handleUpdate(day, 'end', e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 text-right text-slate-400 italic">
                  Not available
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex bg-blue-50 text-blue-700 p-4 rounded-lg items-start">
        <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
        <p className="text-sm border-l border-blue-200 pl-4">
          Patients will only be able to book appointments during your designated active hours. Any booked appointments that conflict with schedule changes will remain strictly manual.
        </p>
      </div>
    </div>
  );
};

export default ScheduleManagement;