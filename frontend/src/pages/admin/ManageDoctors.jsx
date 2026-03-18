import React, { useState, useEffect } from 'react';
import { UserPlus, Edit2, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New Doctor Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    department: '',
    specialization: '',
    experience_years: 0,
    consultation_fee: 100,
    available_days: 'Monday, Wednesday, Friday'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docRes, depRes] = await Promise.all([
        api.get('/doctors/doctors/'),
        api.get('/doctors/departments/')
      ]);
      setDoctors(docRes.data);
      setDepartments(depRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this doctor?')) {
      try {
        await api.delete(`/doctors/doctors/${id}/`);
        toast.success('Doctor removed successfully');
        setDoctors(doctors.filter(d => d.id !== id));
      } catch (error) {
        toast.error('Failed to remove doctor');
      }
    }
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post('/doctors/doctors/', formData);
      setDoctors([...doctors, response.data]);
      toast.success('Doctor profiles created & credentials generated!');
      setIsModalOpen(false);
      setFormData({
        first_name: '', last_name: '', email: '', username: '', password: '',
        department: '', specialization: '', experience_years: 0, consultation_fee: 100,
        available_days: 'Monday, Wednesday, Friday'
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.username?.[0] || 'Error creating doctor profile. Check required fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => 
    `${doctor.user?.first_name} ${doctor.user?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Doctors</h1>
          <p className="text-slate-600 mt-1">Add, update, or remove medical personnel.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Doctor
        </button>
      </div>

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto pt-24 pb-12">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 my-auto relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Onboard New Doctor</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateDoctor} className="p-6">
              <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Account Information</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input type="text" required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input type="text" required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                  <input type="text" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Temporary Password</label>
                  <input type="password" required minLength="8" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Professional Profile</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Select Dept...</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                  <input type="text" required value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} placeholder="e.g. Pediatric Surgery" className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Years of Exp</label>
                  <input type="number" required min="0" value={formData.experience_years} onChange={e => setFormData({...formData, experience_years: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Consultation Fee ($)</label>
                  <input type="number" required min="0" step="0.01" value={formData.consultation_fee} onChange={e => setFormData({...formData, consultation_fee: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Available Work Days</label>
                  <input type="text" required value={formData.available_days} onChange={e => setFormData({...formData, available_days: e.target.value})} placeholder="e.g. Mon, Wed, Fri" className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {isSubmitting ? 'Processing...' : 'Create Doctor Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading directory...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                  <th className="py-4 px-6 font-semibold">Doctor Name</th>
                  <th className="py-4 px-6 font-semibold">Department</th>
                  <th className="py-4 px-6 font-semibold">Specialty</th>
                  <th className="py-4 px-6 font-semibold">Experience</th>
                  <th className="py-4 px-6 font-semibold">Fee</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 uppercase">
                            {doctor.user?.first_name?.charAt(0) || 'D'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              Dr. {doctor.user?.first_name} {doctor.user?.last_name}
                            </p>
                            <p className="text-xs text-slate-500">@{doctor.user?.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        {doctor.department_name || 'General'}
                      </td>
                      <td className="py-4 px-6 text-slate-700">{doctor.specialization || 'General Practice'}</td>
                      <td className="py-4 px-6 text-slate-700">{doctor.experience_years || 0} Years</td>
                      <td className="py-4 px-6 text-slate-700 font-medium">${doctor.consultation_fee}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-3">
                          <button className="text-slate-400 hover:text-blue-600 transition" title="Edit (Coming soon)">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button 
                            className="text-slate-400 hover:text-red-600 transition"
                            onClick={() => handleDelete(doctor.id)}
                            title="Delete Doctor"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">
                      No doctors found matching "{searchTerm}"
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

export default ManageDoctors;