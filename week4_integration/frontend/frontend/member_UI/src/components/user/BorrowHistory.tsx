import React, { useState } from 'react';
import { Book, Calendar, Search, Filter, CheckCircle } from 'lucide-react';

interface BorrowHistoryProps {
  user: any;
  onNavigate: (view: string) => void;
}

export default function BorrowHistory({ user, onNavigate }: BorrowHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const history = [
    {
      BorrowID: 'BR001',
      BookTitle: 'The Great Gatsby',
      AuthorFirstName: 'F. Scott',
      AuthorLastName: 'Fitzgerald',
      BorrowDate: '2025-11-18',
      DueDate: '2025-12-02',
      ReturnDate: null,
      Status: 'Active'
    },
    {
      BorrowID: 'BR002',
      BookTitle: '1984',
      AuthorFirstName: 'George',
      AuthorLastName: 'Orwell',
      BorrowDate: '2025-11-19',
      DueDate: '2025-12-03',
      ReturnDate: null,
      Status: 'Active'
    },
    {
      BorrowID: 'BR003',
      BookTitle: 'To Kill a Mockingbird',
      AuthorFirstName: 'Harper',
      AuthorLastName: 'Lee',
      BorrowDate: '2025-11-10',
      DueDate: '2025-11-24',
      ReturnDate: null,
      Status: 'Overdue'
    },
    {
      BorrowID: 'BR004',
      BookTitle: 'Pride and Prejudice',
      AuthorFirstName: 'Jane',
      AuthorLastName: 'Austen',
      BorrowDate: '2025-10-15',
      DueDate: '2025-10-29',
      ReturnDate: '2025-10-28',
      Status: 'Returned'
    },
    {
      BorrowID: 'BR005',
      BookTitle: 'The Catcher in the Rye',
      AuthorFirstName: 'J.D.',
      AuthorLastName: 'Salinger',
      BorrowDate: '2025-09-20',
      DueDate: '2025-10-04',
      ReturnDate: '2025-10-03',
      Status: 'Returned'
    },
    {
      BorrowID: 'BR006',
      BookTitle: "Harry Potter and the Philosopher's Stone",
      AuthorFirstName: 'J.K.',
      AuthorLastName: 'Rowling',
      BorrowDate: '2025-08-10',
      DueDate: '2025-08-24',
      ReturnDate: '2025-08-22',
      Status: 'Returned'
    },
    {
      BorrowID: 'BR007',
      BookTitle: 'The Hobbit',
      AuthorFirstName: 'J.R.R.',
      AuthorLastName: 'Tolkien',
      BorrowDate: '2025-07-05',
      DueDate: '2025-07-19',
      ReturnDate: '2025-07-26',
      Status: 'Returned Late'
    },
  ];

  const filteredHistory = history.filter(record => {
    const matchesSearch = 
      record.BookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.AuthorFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.AuthorLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.BorrowID.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || record.Status.toLowerCase().replace(' ', '-') === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Borrow History</h1>
        <p className="text-gray-600">View your complete borrowing history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-xs text-gray-600 mb-1">Total Borrows</div>
          <div className="text-xl text-gray-900">{history.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-4">
          <div className="text-xs text-gray-600 mb-1">Active</div>
          <div className="text-xl text-green-700">
            {history.filter(h => h.Status === 'Active').length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-blue-200 p-4">
          <div className="text-xs text-gray-600 mb-1">Returned</div>
          <div className="text-xl text-blue-700">
            {history.filter(h => h.Status === 'Returned').length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-4">
          <div className="text-xs text-gray-600 mb-1">Overdue</div>
          <div className="text-xl text-red-700">
            {history.filter(h => h.Status === 'Overdue').length}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by book title, author, or borrow ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
              <option value="returned-late">Returned Late</option>
            </select>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Book</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Borrow Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Return Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredHistory.map((record) => (
                <tr key={record.BorrowID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                        <Book className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">{record.BookTitle}</div>
                        <div className="text-xs text-gray-600">
                          by {record.AuthorFirstName} {record.AuthorLastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.BorrowDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.DueDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {record.ReturnDate || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      record.Status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : record.Status === 'Returned'
                        ? 'bg-blue-100 text-blue-700'
                        : record.Status === 'Overdue'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.Status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Summary Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-blue-900 mb-2">Reading Summary</h3>
        <p className="text-sm text-blue-800">
          You've borrowed a total of {history.length} books since joining on {user.JoinDate}. 
          Keep up the great reading habit!
        </p>
      </div>
    </div>
  );
}
