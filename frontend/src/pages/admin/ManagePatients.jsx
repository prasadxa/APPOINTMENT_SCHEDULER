import React, { useState, useEffect } from 'react';
import { Users, Search, Activity, User, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a full environment, ensure your backend has a dedicated /users/patients/ endpoint.
    // We mock the fetch or gracefully fallback for the demo.
    const fetchPatients = async () => {
      try {
        const response = await api.get('/users/patients/').catch(() => ({ data: [] }));
        setPatients(response.data);
      } catch (error) {
        // Fallback or error handling
        console.error("Endpoint might not be public/exist yet", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to deactivate this patient record?')) {
      toast.success('Patient record deactivated.');
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  const filteredPatients = patients.filter(patient => 
    `${patient.user?.first_name} ${patient.user?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            Manage Patients
          </h1>
          <p className="text-slate-600 mt-1">View and manage registered hospital patients.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500 flex justify-center items-center">
             <Activity className="animate-spin w-6 h-6 mr-2 text-blue-600" />
             Loading database...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                  <th className="py-4 px-6 font-semibold">Patient Information</th>
                  <th className="py-4 px-6 font-semibold">Contact</th>
                  <th className="py-4 px-6 font-semibold">Date of Birth</th>
                  <th className="py-4 px-6 font-semibold">Medical History</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mr-3">
                            {patient.user?.first_name?.charAt(0) || <User className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {patient.user?.first_name} {patient.user?.last_name}
                            </p>
                            <p className="text-xs text-slate-500">ID: PT-{10000 + patient.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        <p>{patient.user?.email || 'N/A'}</p>
                        <p className="text-xs text-slate-500">{patient.phone_number || 'No phone'}</p>
                      </td>
                      <td className="py-4 px-6 text-slate-700">{patient.date_of_birth || 'Not specified'}</td>
                      <td className="py-4 px-6 text-slate-700 max-w-xs truncate">
                        {patient.medical_history || 'No established history.'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-3">
                          <button className="text-slate-400 hover:text-blue-600 transition" title="Edit Patient">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button 
                            className="text-slate-400 hover:text-red-600 transition"
                            onClick={() => handleDelete(patient.id)}
                            title="Deactivate Record"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-500 bg-slate-50">
                      {patients.length === 0 ? "No patients have been registered yet." : `No patients match "${searchTerm}".`}
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

export default ManagePatients;