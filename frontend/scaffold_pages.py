import os

def create_component(name, title, desc):
    return f"""import React from 'react';

const {name} = () => {{
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <p className="text-slate-600">{desc}</p>
      </div>
    </div>
  );
}};

export default {name};
"""

files = {
    'src/pages/About.jsx': create_component('About', 'About Our Hospital', 'Learn more about our facilities, our expert doctors, and our mission to provide affordable quality healthcare.'),
    'src/pages/Contact.jsx': create_component('Contact', 'Contact Us', 'Reach out for any queries or emergency assistance.'),
    'src/pages/Departments.jsx': create_component('Departments', 'Hospital Departments', 'Browse our specialized departments including Cardiology, Neurology, and Pediatrics.'),

    'src/pages/patient/PatientDashboard.jsx': create_component('PatientDashboard', 'Patient Dashboard', 'Welcome to your dashboard. Manage your appointments, view history, and update your profile here.'),
    'src/pages/patient/AppointmentHistory.jsx': create_component('AppointmentHistory', 'Appointment History', 'View your past and upcoming appointments.'),
    'src/pages/patient/Profile.jsx': create_component('Profile', 'My Profile', 'Manage your personal details and medical history here.'),
    'src/pages/patient/Payments.jsx': create_component('Payments', 'Payments & Billing', 'View your invoices and pay consultation fees online.'),
    'src/pages/patient/BookAppointment.jsx': create_component('BookAppointment', 'Book an Appointment', 'Select a doctor, pick an available slot, and confirm your booking.'),

    'src/pages/doctor/DoctorDashboard.jsx': create_component('DoctorDashboard', 'Doctor Dashboard', 'Welcome Doctor. View your daily schedule and upcoming patient appointments here.'),
    'src/pages/doctor/Appointments.jsx': create_component('Appointments', 'Manage Appointments', 'Accept, reject, or mark appointments as completed. Add consultation notes.'),
    'src/pages/doctor/ScheduleManagement.jsx': create_component('ScheduleManagement', 'Schedule Management', 'Set your available time slots and working days.'),
    'src/pages/doctor/PatientDetails.jsx': create_component('PatientDetails', 'Patient Records', 'View detailed medical history and past notes for your patients.'),

    'src/pages/admin/AdminDashboard.jsx': create_component('AdminDashboard', 'Admin Dashboard', 'System Overview: View total patients, total appointments, revenue, and active doctors.'),
    'src/pages/admin/ManageDoctors.jsx': create_component('ManageDoctors', 'Manage Doctors', 'Add new doctors, remove inactive ones, and update doctor profiles.'),
    'src/pages/admin/ManagePatients.jsx': create_component('ManagePatients', 'Manage Patients', 'View and manage registered patient accounts.'),
    'src/pages/admin/ManageAppointments.jsx': create_component('ManageAppointments', 'Manage All Appointments', 'System-wide view of all booked, cancelled, and completed appointments.'),
    'src/pages/admin/Reports.jsx': create_component('Reports', 'Analytics & Reports', 'View payment reports, hospital revenue, and usage analytics.'),
    'src/pages/admin/Settings.jsx': create_component('Settings', 'System Settings', 'Manage hospital branches and system-wide configurations.')
}

os.makedirs('src/pages/patient', exist_ok=True)
os.makedirs('src/pages/doctor', exist_ok=True)
os.makedirs('src/pages/admin', exist_ok=True)

for path, content in files.items():
    with open(path, 'w') as f:
        f.write(content)

print("Scaffold complete!")
