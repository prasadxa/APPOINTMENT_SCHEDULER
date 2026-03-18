import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, deptsRes] = await Promise.all([
          api.get('/doctors/doctors/'),
          api.get('/doctors/departments/')
        ]);
        setDoctors(docsRes.data);
        setDepartments(deptsRes.data);
      } catch (error) {
        toast.error('Failed to load doctors and departments');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredDoctors = selectedDept 
    ? doctors.filter(doc => doc.department?.id === parseInt(selectedDept))
    : doctors;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/appointments/', {
        doctor: selectedDoctor,
        appointment_date: date,
        appointment_time: time,
        reason: reason,
        status: 'pending' // Default status per your schema
      });
      toast.success('Appointment booked successfully!');
      navigate('/patient/dashboard');
    } catch (err) {
      toast.error('Failed to book appointment');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Book an Appointment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Department Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Department (Optional)
              </label>
              <select 
                value={selectedDept}
                onChange={(e) => {
                  setSelectedDept(e.target.value);
                  setSelectedDoctor(''); // Reset doctor when dept changes
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Doctor *
              </label>
              <select 
                required
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Doctor</option>
                {filteredDoctors.map(doc => (
                  <option key={doc.user.id} value={doc.user.id}>
                    Dr. {doc.user.first_name} {doc.user.last_name} ({doc.department?.name || 'General'})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preferred Date *
              </label>
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // prevent past dates
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preferred Time *
              </label>
              <input 
                type="time" 
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Reason for Visit / Symptoms
            </label>
            <textarea
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe your symptoms or reason for the visit..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-4 relative z-10">
            <button
              type="button"
              onClick={() => navigate('/patient/dashboard')}
              className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition flex items-center"
            >
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
