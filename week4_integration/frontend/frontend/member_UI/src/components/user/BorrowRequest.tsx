import React, { useState } from 'react';
import { ArrowLeft, Calendar, Book, User, CheckCircle } from 'lucide-react';

interface BorrowRequestProps {
  book: any;
  user: any;
  onNavigate: (view: string) => void;
}

export default function BorrowRequest({ book, user, onNavigate }: BorrowRequestProps) {
  const today = new Date();
  const defaultDueDate = new Date(today);
  defaultDueDate.setDate(today.getDate() + 14);

  const [borrowDate] = useState(today.toISOString().split('T')[0]);
  const [dueDate] = useState(defaultDueDate.toISOString().split('T')[0]);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, would submit to API
    alert('Borrow request submitted successfully!');
    onNavigate('my-borrowed');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('book-details', book)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Book Details
      </button>

      {/* Header */}
      <div>
        <h1 className="text-gray-900">Borrow Request</h1>
        <p className="text-gray-600">Review and confirm your borrow request</p>
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
              <h3 className="text-gray-900 mb-1">{book.Title}</h3>
              <p className="text-gray-600 mb-2">
                by {book.AuthorFirstName} {book.AuthorLastName}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  {book.Genre}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  ISBN: {book.ISBN}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Member Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Member Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Member Name</div>
                <div className="text-gray-900">{user.MemberFirstName} {user.MemberLastName}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Book className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Member ID</div>
                <div className="text-gray-900">{user.MemberID}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Membership Status</div>
                <div className="text-gray-900">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    {user.MemberStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-600">Expires On</div>
                <div className="text-gray-900">{user.MemberExpiryDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Borrow Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Borrow Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Borrow Date
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={borrowDate}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={dueDate}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Standard Borrowing Period:</strong> 14 days
            </p>
            <p className="text-sm text-blue-800 mt-1">
              You can return the book earlier or request a renewal if needed.
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Terms & Conditions</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>I agree to return the book on or before the due date</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>I understand that late returns incur a fine of $1.00 per day</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>I will take care of the book and return it in good condition</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>I am responsible for any damage or loss of the borrowed book</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>I can borrow a maximum of 5 books at a time</span>
              </li>
            </ul>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="w-5 h-5 mt-0.5 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">
              I have read and agree to all the terms and conditions listed above
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={!agreed}
            className={`flex-1 px-6 py-3 rounded-lg transition-all ${
              agreed
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Borrow Request
          </button>
          <button
            type="button"
            onClick={() => onNavigate('book-details', book)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
