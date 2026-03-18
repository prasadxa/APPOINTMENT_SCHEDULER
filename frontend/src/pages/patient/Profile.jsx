import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Key, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.patient_profile?.phone_number || '',
    address: user?.patient_profile?.address || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.patch('/auth/me/', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        patient_profile: {
          phone_number: formData.phone,
          address: formData.address
        }
      });
      toast.success('Profile updated successfully!', { icon: '🧑‍⚕️' });
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-600 mt-1">Manage your personal information and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Nav (Visual) */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm text-left font-medium text-blue-600">
            <span className="flex items-center"><User className="w-5 h-5 mr-3"/> Profile</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-slate-50 border border-transparent rounded-lg text-left font-medium text-slate-600 transition">
            <span className="flex items-center"><Key className="w-5 h-5 mr-3"/> Security</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-red-50 hover:text-red-700 border border-transparent rounded-lg text-left font-medium text-slate-600 transition">
            <span className="flex items-center text-red-600"><Save className="w-5 h-5 mr-3"/> Delete Account</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                 {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{formData.firstName} {formData.lastName}</h2>
                <p className="text-slate-500 text-sm">Patient Account</p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-slate-400" /> Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed directly. Contact support.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-slate-400" /> Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" /> Home Address
                </label>
                <textarea
                  rows="2"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-50 flex items-center"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;