import React, { useState } from 'react';
import { Book, Calendar, AlertCircle, RotateCcw, Search } from 'lucide-react';

interface MyBorrowedBooksProps {
  user: any;
  onNavigate: (view: string, item?: any) => void;
}

export default function MyBorrowedBooks({ user, onNavigate }: MyBorrowedBooksProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const borrows = [
    {
      BorrowID: 'BR001',
      BookTitle: 'The Great Gatsby',
      AuthorFirstName: 'F. Scott',
      AuthorLastName: 'Fitzgerald',
      BookID: 'BC002',
      BorrowDate: '2025-11-18',
      DueDate: '2025-12-02',
      ReturnDate: null,
      Status: 'Active',
      daysLeft: 6
    },
    {
      BorrowID: 'BR002',
      BookTitle: '1984',
      AuthorFirstName: 'George',
      AuthorLastName: 'Orwell',
      BookID: 'BC003',
      BorrowDate: '2025-11-19',
      DueDate: '2025-12-03',
      ReturnDate: null,
      Status: 'Active',
      daysLeft: 7
    },
    {
      BorrowID: 'BR003',
      BookTitle: 'To Kill a Mockingbird',
      AuthorFirstName: 'Harper',
      AuthorLastName: 'Lee',
      BookID: 'BC005',
      BorrowDate: '2025-11-10',
      DueDate: '2025-11-24',
      ReturnDate: null,
      Status: 'Overdue',
      daysLeft: -2
    },
  ];

  const filteredBorrows = borrows.filter(borrow =>
    borrow.BookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borrow.AuthorFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borrow.AuthorLastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">My Borrowed Books</h1>
        <p className="text-gray-600">View and manage your currently borrowed books</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Total Borrowed</div>
          <div className="text-2xl text-gray-900">{borrows.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Active</div>
          <div className="text-2xl text-green-700">
            {borrows.filter(b => b.Status === 'Active').length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Overdue</div>
          <div className="text-2xl text-red-700">
            {borrows.filter(b => b.Status === 'Overdue').length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search borrowed books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-4">
        {filteredBorrows.map((borrow) => (
          <div
            key={borrow.BorrowID}
            className={`bg-white rounded-xl border p-6 ${
              borrow.Status === 'Overdue' ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <div className="w-24 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Book className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Book Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{borrow.BookTitle}</h3>
                    <p className="text-gray-600">
                      by {borrow.AuthorFirstName} {borrow.AuthorLastName}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    borrow.Status === 'Active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {borrow.Status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <div className="text-xs text-gray-500">Borrowed</div>
                      <div>{borrow.BorrowDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <div className="text-xs text-gray-500">Due Date</div>
                      <div>{borrow.DueDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {borrow.daysLeft < 0 ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Calendar className="w-4 h-4 text-gray-600" />
                    )}
                    <div>
                      <div className="text-xs text-gray-500">Time Left</div>
                      <div className={borrow.daysLeft < 0 ? 'text-red-600' : 'text-gray-900'}>
                        {borrow.daysLeft < 0 
                          ? `${Math.abs(borrow.daysLeft)} days overdue`
                          : `${borrow.daysLeft} days left`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('return-confirmation', borrow)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Return Book
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Request Renewal
                  </button>
                  {borrow.Status === 'Overdue' && (
                    <button
                      onClick={() => onNavigate('fines')}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      View Fine
                    </button>
                  )}
                </div>

                {/* Overdue Warning */}
                {borrow.Status === 'Overdue' && (
                  <div className="mt-4 bg-red-100 border border-red-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-red-800">
                        This book is overdue. Please return it as soon as possible to avoid additional fines.
                        Current fine: ${Math.abs(borrow.daysLeft) * 1}.00
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBorrows.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No borrowed books</h3>
          <p className="text-gray-600 mb-4">You haven't borrowed any books yet</p>
          <button
            onClick={() => onNavigate('books')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Books
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-blue-900 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-800 mb-4">
          If you have any questions about your borrowed books or need to report an issue, please contact the library staff.
        </p>
        <button
          onClick={() => onNavigate('borrow-history')}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          View Borrow History →
        </button>
      </div>
    </div>
  );
}
