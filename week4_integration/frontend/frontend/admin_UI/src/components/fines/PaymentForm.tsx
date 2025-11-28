import React, { useState } from 'react';
import { ArrowLeft, Save, CreditCard } from 'lucide-react';

interface PaymentFormProps {
  fine: any;
  onBack: () => void;
  onSave: () => void;
}

export default function PaymentForm({ fine, onBack, onSave }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recording payment:', { ...fine, paymentMethod, paymentDate, notes });
    onSave();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-gray-900">Record Payment</h1>
          <p className="text-gray-600">Process fine payment for member</p>
        </div>
      </div>

      {/* Fine Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Fine Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Fine ID</label>
            <div className="text-gray-900 mt-1">{fine.FineID}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Member</label>
            <div className="text-gray-900 mt-1">{fine.MemberName}</div>
            <div className="text-xs text-gray-500">{fine.MemberID}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Borrow ID</label>
            <div className="text-gray-900 mt-1">{fine.BorrowID}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Date Issued</label>
            <div className="text-gray-900 mt-1">{fine.DateIssued}</div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Reason</label>
            <div className="text-gray-900 mt-1">{fine.Reason}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Amount Due</label>
            <div className="text-2xl text-gray-900 mt-1">${fine.Amount.toFixed(2)}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <div className="mt-1">
              <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                {fine.FineStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-gray-900 mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Payment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                  <option value="Online Payment">Online Payment</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes about the payment..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-green-900">Payment Summary</h4>
                <p className="text-sm text-green-800 mt-1">
                  Processing payment for {fine.MemberName}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-green-700">Amount</div>
                <div className="text-2xl text-green-900">${fine.Amount.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Payment Methods Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm text-blue-900">Payment Processing</h4>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Payment will be recorded immediately</li>
                  <li>• Fine status will be updated to "Paid"</li>
                  <li>• Member will receive payment confirmation</li>
                  <li>• Receipt will be generated automatically</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Record Payment
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
