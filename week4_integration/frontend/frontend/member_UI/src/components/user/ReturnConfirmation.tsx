import React, { useState } from 'react';
import { ArrowLeft, Book, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface ReturnConfirmationProps {
  borrow: any;
  onNavigate: (view: string) => void;
}

export default function ReturnConfirmation({ borrow, onNavigate }: ReturnConfirmationProps) {
  const [returnDate] = useState(new Date().toISOString().split('T')[0]);
  const [condition, setCondition] = useState('Good');
  const [feedback, setFeedback] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // Calculate if overdue
  const dueDate = new Date(borrow.DueDate);
  const returnDateObj = new Date(returnDate);
  const isOverdue = returnDateObj > dueDate;
  const daysOverdue = isOverdue 
    ? Math.ceil((returnDateObj.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const fineAmount = daysOverdue * 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Book return processed successfully!');
    onNavigate('my-borrowed');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('my-borrowed')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to My Books
      </button>

      {/* Header */}
      <div>
        <h1 className="text-gray-900">Return Book</h1>
        <p className="text-gray-600">Confirm book return and provide feedback</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Book Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Book Details</h2>
          <div className="flex items-start gap-4">
            <div className="w-20 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Book className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{borrow.BookTitle}</h3>
              <p className="text-gray-600 mb-3">
                by {borrow.AuthorFirstName} {borrow.AuthorLastName}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Borrow ID</div>
                  <div className="text-gray-900">{borrow.BorrowID}</div>
                </div>
                <div>
                  <div className="text-gray-600">Book ID</div>
                  <div className="text-gray-900">{borrow.BookID}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Borrow Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Borrow Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Borrow Date</div>
                <div className="text-gray-900">{borrow.BorrowDate}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Due Date</div>
                <div className="text-gray-900">{borrow.DueDate}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Return Date</div>
                <div className="text-gray-900">{returnDate}</div>
              </div>
            </div>
          </div>

          {/* Overdue Warning */}
          {isOverdue && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-red-900">Late Return Notice</h4>
                  <p className="text-sm text-red-800 mt-1">
                    This book is {daysOverdue} day{daysOverdue > 1 ? 's' : ''} overdue. 
                    A late fee of ${fineAmount.toFixed(2)} will be added to your account.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Return Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Return Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Book Condition <span className="text-red-500">*</span>
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Good">Good - No visible damage</option>
                <option value="Fair">Fair - Minor wear and tear</option>
                <option value="Poor">Poor - Significant damage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Feedback (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts about this book..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Your feedback helps other readers discover great books!
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Confirmation</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="mb-2">Please confirm the following before returning:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>The book is in the stated condition</li>
                  <li>All pages are intact and readable</li>
                  <li>No additional materials (bookmarks, notes) left inside</li>
                  {isOverdue && <li>You understand that a late fee will be applied</li>}
                </ul>
              </div>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              required
              className="w-5 h-5 mt-0.5 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">
              I confirm that the information provided is accurate and I am ready to return this book to the library.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={!confirmed}
            className={`flex-1 px-6 py-3 rounded-lg transition-all ${
              confirmed
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Return
          </button>
          <button
            type="button"
            onClick={() => onNavigate('my-borrowed')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
