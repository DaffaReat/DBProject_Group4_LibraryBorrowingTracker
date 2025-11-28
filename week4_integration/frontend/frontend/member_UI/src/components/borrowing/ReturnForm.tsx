import React, { useState } from 'react';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

interface ReturnFormProps {
  borrow: any;
  onBack: () => void;
  onSave: () => void;
}

export default function ReturnForm({ borrow, onBack, onSave }: ReturnFormProps) {
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookCondition, setBookCondition] = useState('Good');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Processing return:', { ...borrow, returnDate, bookCondition, notes });
    onSave();
  };

  // Calculate if overdue
  const dueDate = new Date(borrow.DueDate);
  const returnDateObj = new Date(returnDate);
  const isOverdue = returnDateObj > dueDate;
  const daysOverdue = isOverdue 
    ? Math.ceil((returnDateObj.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const fineAmount = daysOverdue * 1; // $1 per day

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
          <h1 className="text-gray-900">Return Book</h1>
          <p className="text-gray-600">Process book return and update availability</p>
        </div>
      </div>

      {/* Borrow Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Borrow Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Borrow ID</label>
            <div className="text-gray-900 mt-1">{borrow.BorrowID}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Member</label>
            <div className="text-gray-900 mt-1">{borrow.MemberName}</div>
            <div className="text-xs text-gray-500">{borrow.MemberID}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Book</label>
            <div className="text-gray-900 mt-1">{borrow.BookTitle}</div>
            <div className="text-xs text-gray-500">{borrow.BookID}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Borrow Date</label>
            <div className="text-gray-900 mt-1">{borrow.BorrowDate}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Due Date</label>
            <div className="text-gray-900 mt-1">{borrow.DueDate}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <div className="mt-1">
              <span className={`px-3 py-1 rounded-full text-xs ${
                borrow.Status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {borrow.Status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Return Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-gray-900 mb-4">Return Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Return Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Book Condition <span className="text-red-500">*</span>
                </label>
                <select
                  value={bookCondition}
                  onChange={(e) => setBookCondition(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes about the return..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Overdue Warning */}
          {isOverdue && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-red-900">Overdue Return</h4>
                  <p className="text-sm text-red-800 mt-1">
                    This book is {daysOverdue} day{daysOverdue > 1 ? 's' : ''} overdue. 
                    A fine of ${fineAmount.toFixed(2)} will be automatically issued.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Book Condition Warning */}
          {(bookCondition === 'Damaged' || bookCondition === 'Lost') && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-yellow-900">Book Condition Issue</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    {bookCondition === 'Damaged' 
                      ? 'A damage assessment will be required. Additional fines may apply.'
                      : 'Member will be charged for the replacement cost of the book.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Process Return
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
