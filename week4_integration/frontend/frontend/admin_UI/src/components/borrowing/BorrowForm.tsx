import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

interface BorrowFormProps {
  onBack: () => void;
  onSave: () => void;
}

export default function BorrowForm({ onBack, onSave }: BorrowFormProps) {
  const [formData, setFormData] = useState({
    BorrowID: '',
    MemberID: '',
    BookID: '',
    StaffID: '',
    BorrowDate: new Date().toISOString().split('T')[0],
    DueDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating borrow:', formData);
    onSave();
  };

  const members = [
    { MemberID: 'M001', Name: 'John Smith' },
    { MemberID: 'M002', Name: 'Sarah Johnson' },
    { MemberID: 'M003', Name: 'Michael Brown' },
    { MemberID: 'M004', Name: 'Emily Davis' },
  ];

  const availableBooks = [
    { BookID: 'BC001', Title: 'The Great Gatsby' },
    { BookID: 'BC003', Title: '1984' },
    { BookID: 'BC004', Title: 'To Kill a Mockingbird' },
    { BookID: 'BC006', Title: 'The Catcher in the Rye' },
    { BookID: 'BC007', Title: "Harry Potter and the Philosopher's Stone" },
    { BookID: 'BC009', Title: 'The Hobbit' },
  ];

  const staff = [
    { StaffID: 'S001', Name: 'Alice Johnson' },
    { StaffID: 'S002', Name: 'Robert Williams' },
    { StaffID: 'S003', Name: 'Maria Garcia' },
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
          <h1 className="text-gray-900">New Borrow Record</h1>
          <p className="text-gray-600">Create a new book borrowing record</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Borrow Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Borrow Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Borrow ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="BorrowID"
                  value={formData.BorrowID}
                  onChange={handleChange}
                  placeholder="BR001"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  Member <span className="text-red-500">*</span>
                </label>
                <select
                  name="MemberID"
                  value={formData.MemberID}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select member...</option>
                  {members.map(m => (
                    <option key={m.MemberID} value={m.MemberID}>
                      {m.Name} ({m.MemberID})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Book Copy <span className="text-red-500">*</span>
                </label>
                <select
                  name="BookID"
                  value={formData.BookID}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select available book...</option>
                  {availableBooks.map(b => (
                    <option key={b.BookID} value={b.BookID}>
                      {b.Title} ({b.BookID})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Borrow Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="BorrowDate"
                  value={formData.BorrowDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="DueDate"
                  value={formData.DueDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm text-blue-900 mb-2">Borrowing Policy</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Standard borrowing period is 14 days</li>
              <li>Members can borrow up to 5 books at a time</li>
              <li>Overdue fines: $1 per day per book</li>
              <li>Books can be renewed once if not reserved</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Create Borrow Record
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
