import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

interface FineFormProps {
  onBack: () => void;
  onSave: () => void;
}

export default function FineForm({ onBack, onSave }: FineFormProps) {
  const [formData, setFormData] = useState({
    FineID: '',
    BorrowID: '',
    StaffID: '',
    Amount: '',
    DateIssued: new Date().toISOString().split('T')[0],
    FineStatus: 'Unpaid',
    Reason: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Issuing fine:', formData);
    onSave();
  };

  const borrows = [
    { BorrowID: 'BR001', Member: 'John Smith', Book: 'The Great Gatsby', Status: 'Overdue' },
    { BorrowID: 'BR003', Member: 'Michael Brown', Book: 'To Kill a Mockingbird', Status: 'Overdue' },
    { BorrowID: 'BR006', Member: 'David Wilson', Book: 'The Catcher in the Rye', Status: 'Overdue' },
  ];

  const staff = [
    { StaffID: 'S001', Name: 'Alice Johnson' },
    { StaffID: 'S002', Name: 'Robert Williams' },
    { StaffID: 'S003', Name: 'Maria Garcia' },
  ];

  const fineTypes = [
    { label: 'Late Return (Per Day)', rate: 1.00 },
    { label: 'Book Damage - Minor', rate: 25.00 },
    { label: 'Book Damage - Major', rate: 50.00 },
    { label: 'Lost Book', rate: 100.00 },
    { label: 'Custom Amount', rate: 0 },
  ];

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
          <h1 className="text-gray-900">Issue Fine</h1>
          <p className="text-gray-600">Create a new fine for a member</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Fine Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Fine Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fine ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="FineID"
                  value={formData.FineID}
                  onChange={handleChange}
                  placeholder="F001"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Borrow Record <span className="text-red-500">*</span>
                </label>
                <select
                  name="BorrowID"
                  value={formData.BorrowID}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select borrow record...</option>
                  {borrows.map(b => (
                    <option key={b.BorrowID} value={b.BorrowID}>
                      {b.BorrowID} - {b.Member} - {b.Book}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Processing Staff <span className="text-red-500">*</span>
                </label>
                <select
                  name="StaffID"
                  value={formData.StaffID}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select staff...</option>
                  {staff.map(s => (
                    <option key={s.StaffID} value={s.StaffID}>
                      {s.Name} ({s.StaffID})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Amount ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="Amount"
                  value={formData.Amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Date Issued <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="DateIssued"
                  value={formData.DateIssued}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Fine Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="FineStatus"
                  value={formData.FineStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                  <option value="Waived">Waived</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-2">
                  Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="Reason"
                  value={formData.Reason}
                  onChange={handleChange}
                  placeholder="Late Return - 15 days overdue"
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Fine Rate Reference */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm text-gray-900 mb-3">Standard Fine Rates</h4>
            <div className="space-y-2">
              {fineTypes.map((type, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{type.label}</span>
                  <span className="text-gray-900">
                    {type.rate > 0 ? `$${type.rate.toFixed(2)}` : 'Variable'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Issue Fine
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
