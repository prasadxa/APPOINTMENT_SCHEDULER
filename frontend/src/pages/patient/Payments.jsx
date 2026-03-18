import React, { useState } from 'react';
import { CreditCard, Download, FileText, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Payments = () => {
  const [payments] = useState([
    {
      id: "INV-2023-001",
      date: "2023-11-01",
      description: "General Consultation (Dr. Sarah Connor)",
      amount: 150.00,
      status: "paid"
    },
    {
      id: "INV-2023-084",
      date: "2023-11-15",
      description: "Blood Test & Lab Analysis",
      amount: 85.50,
      status: "paid"
    },
    {
      id: "INV-2023-142",
      date: "2023-12-05",
      description: "Follow-up Appt. (Dr. Michael Chang)",
      amount: 100.00,
      status: "pending"
    }
  ]);

  const handlePayNow = (id) => {
    toast.success(`Mock Payment Processing for ${id}...`);
    // Mock functionality for taking patient to stripe/paypal or clearing db record
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
          Billing & Payments
        </h1>
        <p className="text-slate-600 mt-2">Manage your medical invoices and transaction history.</p>
      </div>

      {payments.filter(p => p.status === 'pending').length > 0 && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-amber-900">Outstanding Balance</h3>
            <p className="text-amber-700">You have unpaid invoices that require your attention.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition shadow-sm">
              Pay Total Balance
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Transaction History</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {payments.map((payment) => (
            <div key={payment.id} className="p-6 flex flex-col sm:flex-row justify-between items-center hover:bg-slate-50 transition">
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {payment.status === 'paid' ? (
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{payment.description}</h4>
                  <div className="text-sm text-slate-500 mt-1 space-y-1">
                    <p>Invoice \# {payment.id}</p>
                    <p>Issued: {payment.date}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex flex-col items-end gap-3 text-right">
                <div className="text-xl font-bold text-slate-900 w-32 border-b border-slate-200 pb-2">
                  ${payment.amount.toFixed(2)}
                </div>
                
                {payment.status === 'paid' ? (
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 font-semibold text-sm uppercase">Paid</span>
                    <button className="text-slate-400 hover:text-blue-600 transition flex items-center text-sm font-medium" title="Download Receipt">
                      <Download className="w-4 h-4 mr-1"/> Receipt
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handlePayNow(payment.id)}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded hover:bg-slate-800 transition"
                  >
                    Pay Now
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;