import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, HeartPulse, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import api from '../services/api';

const Home = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder API Call for featured doctors
    const fetchDoctors = async () => {
      try {
        // const response = await api.get('/doctors/?featured=true');
        // setFeaturedDoctors(response.data);
        
        // Mock data
        setFeaturedDoctors([
          { id: 1, name: 'Sarah Jenkins', specialization: 'Cardiologist', department: 'Cardiology', experience: 15, consultation_fee: 150 },
          { id: 2, name: 'Michael Chen', specialization: 'Neurologist', department: 'Neurology', experience: 10, consultation_fee: 200 },
          { id: 3, name: 'Emily Davis', specialization: 'Pediatrician', department: 'Pediatrics', experience: 8, consultation_fee: 100 },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors", error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-4 sm:px-6 lg:px-8 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Book Your Next <span className="text-blue-600">Healthcare</span> Appointment
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              Find top doctors near you, read reviews, and book appointments instantly online. Your health, simplified.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/doctors" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors text-center inline-flex items-center justify-center">
                Find a Doctor <Search className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/login" className="bg-white hover:bg-slate-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border border-slate-200 shadow-sm transition-colors text-center">
                Patient Login
              </Link>
            </div>
            
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-blue-200/50">
              <div className="flex items-center text-sm font-medium text-slate-600">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Verified Doctors
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> 24/7 Booking
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center z-10">
            {/* Visual Placeholder */}
            <div className="relative">
              <div className="w-80 h-80 bg-blue-200 rounded-full blur-3xl absolute top-0 left-0 opacity-50"></div>
              <img src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=800" alt="Doctor Consultation" className="relative rounded-2xl shadow-2xl border-4 border-white object-cover aspect-[4/3]" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 border border-slate-100">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">100% Secure</p>
                  <p className="text-sm text-slate-500">Patient Data Protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose HealthHub?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We provide the most seamless and modern healthcare experience for patients globally.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Easy Search</h3>
              <p className="text-slate-600">Find the right specialist by department, experience, or ratings within seconds.</p>
            </div>
            
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Booking</h3>
              <p className="text-slate-600">View real-time availability and confirm your appointment slot instantly.</p>
            </div>
            
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Care</h3>
              <p className="text-slate-600">Access to highly rated professionals and top-tier hospital facilities securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Specialists</h2>
              <p className="text-slate-600">Book an appointment with our highly recommended doctors.</p>
            </div>
            <Link to="/doctors" className="text-blue-600 font-medium hover:text-blue-700 items-center hidden sm:flex">
              View All Doctors <span className="ml-1">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 h-64 animate-pulse">
                  <div className="w-24 h-24 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              featuredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;