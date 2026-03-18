import React from 'react';
import { User, MapPin, Calendar, Clock, Star } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row">
      {/* Image Section */}
      <div className="sm:w-1/3 h-48 sm:h-auto bg-blue-50 flex items-center justify-center p-4">
        {doctor.profile_image ? (
          <img
            src={doctor.profile_image}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold border-4 border-white shadow-sm">
            {doctor.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Dr. {doctor.name}</h3>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
            </div>
            <div className="flex items-center text-sm font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 mr-1 fill-current" />
              <span>{doctor.rating || '4.8'}</span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex items-center text-gray-600 text-sm">
              <User className="w-4 h-4 mr-2" />
              {doctor.experience} Years Experience
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {doctor.department}
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <div className="text-lg font-bold text-gray-900">
            ${doctor.consultation_fee}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;