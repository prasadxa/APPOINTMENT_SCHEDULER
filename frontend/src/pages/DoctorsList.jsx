import React, { useEffect, useState } from 'react';
import api from '../services/api';
import DoctorCard from '../components/DoctorCard';
import { Search } from 'lucide-react';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/doctors/');
        // Django DRF paginated response returns data in response.data.results typically, or flat array if unpaginated
        const data = response.data.results || response.data;
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Find a Doctor</h1>
          <p className="text-slate-600 mt-1">Book an appointment with our expert medical professionals.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={{
                id: doctor.id,
                name: `${doctor.user.first_name} ${doctor.user.last_name}`,
                specialization: doctor.specialization,
                department: doctor.department_name,
                experience: doctor.experience_years,
                consultation_fee: doctor.consultation_fee
              }} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900">No doctors found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;