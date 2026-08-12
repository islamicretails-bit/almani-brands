'use client';

import React, { useState } from 'react';
import { XIcon, UploadCloudIcon, CheckCircleIcon, HourglassIcon } from 'lucide-react';
import clsx from 'clsx';

interface PaymentVerificationModalProps {
  onClose: () => void;
}

interface PaymentEntry {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  receiptUrl?: string;
  submittedAt: string;
}

const samplePayments: PaymentEntry[] = [
  {
    id: 'pay-1',
    orderId: 'NEXA-ORD-123456',
    amount: 13500,
    currency: 'PKR',
    method: 'Raast',
    status: 'Pending',
    receiptUrl: '/images/receipt-pkr-1.jpg',
    submittedAt: '2024-03-01 10:30',
  },
  {
    id: 'pay-2',
    orderId: 'NEXA-ORD-789012',
    amount: 39,
    currency: 'GBP',
    method: 'Bank Transfer',
    status: 'Verified',
    receiptUrl: '/images/receipt-gbp-1.png',
    submittedAt: '2024-02-28 14:00',
  },
  {
    id: 'pay-3',
    orderId: 'NEXA-ORD-345678',
    amount: 49,
    currency: 'USD',
    method: 'Wire Transfer',
    status: 'Pending',
    receiptUrl: '/images/receipt-usd-1.pdf',
    submittedAt: '2024-03-02 09:00',
  },
];

const PaymentVerificationModal: React.FC<PaymentVerificationModalProps> = ({ onClose }) => {
  const [payments, setPayments] = useState<PaymentEntry[]>(samplePayments);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: 'Verified' | 'Rejected') => {
    setPayments(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
    // In a real application, you would make an API call to update the backend
  };

  return (
    <div className="fixed inset-0 bg-cyber-bg bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card p-6 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-cyber-emerald mb-6">Payment Verification Hub</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-300 mb-3">Pending Payments</h3>
          {payments.filter(p => p.status === 'Pending').length === 0 && (
            <p className="text-gray-500">No pending payments for verification.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payments.filter(p => p.status === 'Pending').map(payment => (
              <div key={payment.id} className="glass-card p-4 rounded-md border border-cyber-border">
                <p className="font-medium text-white mb-2">Order ID: <span className="text-cyber-cyan">{payment.orderId}</span></p>
                <p className="text-gray-300">Amount: <span className="font-semibold">{payment.amount} {payment.currency}</span></p>
                <p className="text-gray-400">Method: {payment.method}</p>
                <p className="text-gray-500 text-sm">Submitted: {payment.submittedAt}</p>
                {payment.receiptUrl && (
                  <button
                    onClick={() => setSelectedReceipt(payment.receiptUrl!)}
                    className="mt-3 flex items-center text-cyber-accent hover:text-cyber-cyan text-sm transition-colors duration-200"
                  >
                    <UploadCloudIcon className="w-4 h-4 mr-1" /> View Receipt
                  </button>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(payment.id, 'Verified')}
                    className="flex-1 bg-green-700/50 hover:bg-green-600/70 text-white py-2 rounded-md text-sm transition-all duration-200"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleStatusChange(payment.id, 'Rejected')}
                    className="flex-1 bg-red-700/50 hover:bg-red-600/70 text-white py-2 rounded-md text-sm transition-all duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-300 mb-3">Verified/Rejected Payments</h3>
          {payments.filter(p => p.status !== 'Pending').length === 0 && (
            <p className="text-gray-500">No processed payments.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payments.filter(p => p.status !== 'Pending').map(payment => (
              <div key={payment.id} className="glass-card p-4 rounded-md border border-cyber-border">
                <p className="font-medium text-white mb-2">Order ID: <span className="text-cyber-cyan">{payment.orderId}</span></p>
                <p className="text-gray-300">Amount: <span className="font-semibold">{payment.amount} {payment.currency}</span></p>
                <p className="text-gray-400">Method: {payment.method}</p>
                <p className="text-gray-500 text-sm">Submitted: {payment.submittedAt}</p>
                <span className={clsx(
                  "mt-3 flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit",
                  payment.status === 'Verified' ? 'bg-green-900/30 text-green-300'
                  : 'bg-red-900/30 text-red-300'
                )}>
                  {payment.status === 'Verified' ? <CheckCircleIcon className="w-3 h-3 mr-1" /> : <XIcon className="w-3 h-3 mr-1" />}
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {selectedReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative bg-cyber-card border border-cyber-border p-4 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <XIcon className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-semibold text-cyber-cyan mb-4">Receipt for {selectedReceipt.split('/').pop()}</h3>
              {selectedReceipt.endsWith('.pdf') ? (
                <embed src={selectedReceipt} type="application/pdf" width="100%" height="500px" />
              ) : (
                <img src={selectedReceipt} alt="Payment Receipt" className="max-w-full h-auto max-h-[500px] object-contain mx-auto" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerificationModal;
