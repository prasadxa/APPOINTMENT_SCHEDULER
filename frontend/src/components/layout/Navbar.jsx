import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, Activity } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'patient') return '/patient/dashboard';
    if (user?.role === 'doctor') return '/doctor/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-slate-800">HealthHub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-500 transition px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-500 transition px-3 py-2 text-sm font-medium">About</Link>
            <Link to="/doctors" className="text-gray-600 hover:text-blue-500 transition px-3 py-2 text-sm font-medium">Doctors</Link>
            <Link to="/departments" className="text-gray-600 hover:text-blue-500 transition px-3 py-2 text-sm font-medium">Departments</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition px-3 py-2 text-sm font-medium">Contact</Link>
            
            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <Link to={getDashboardLink()} className="text-gray-600 hover:text-blue-500 flex items-center gap-2 text-sm font-medium bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  <UserIcon className="w-4 h-4"/>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 ml-2 border-l pl-6 border-slate-200">
                <Link to="/login" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">Log in</Link>
                <Link to="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="pt-2 pb-3 space-y-1 px-4 text-center">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">About</Link>
            <Link to="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Doctors</Link>
            <Link to="/departments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Departments</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Contact Us</Link>
            
            {user ? (
              <div className="border-t border-slate-100 pt-2 mt-2">
                <Link to={getDashboardLink()} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50 mb-2">My Dashboard</Link>
                <button onClick={handleLogout} className="block w-full px-3 py-2 rounded-md text-base font-medium text-red-600 bg-red-50">Logout</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
