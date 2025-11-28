import React, { useState } from 'react';
import { Plus, Search, Edit, RotateCcw, Filter, AlertCircle } from 'lucide-react';

interface BorrowListProps {
  onNavigate: (view: string, item?: any) => void;
}

export default function BorrowList({ onNavigate }: BorrowListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const borrows = [
    {
      BorrowID: 'BR001',
      MemberID: 'M001',
      MemberName: 'John Smith',
      BookID: 'BC002',
      BookTitle: 'The Great Gatsby',
      StaffID: 'S001',
      BorrowDate: '2025-11-18',
      DueDate: '2025-12-02',
      ReturnDate: null,
      Status: 'Active'
    },
    {
      BorrowID: 'BR002',
      MemberID: 'M002',
      MemberName: 'Sarah Johnson',
      BookID: 'BC003',
      BookTitle: '1984',
      StaffID: 'S002',
      BorrowDate: '2025-11-19',
      DueDate: '2025-12-03',
      ReturnDate: null,
      Status: 'Active'
    },
    {
      BorrowID: 'BR003',
      MemberID: 'M003',
      MemberName: 'Michael Brown',
      BookID: 'BC005',
      BookTitle: 'To Kill a Mockingbird',
      StaffID: 'S001',
      BorrowDate: '2025-11-10',
      DueDate: '2025-11-24',
      ReturnDate: null,
      Status: 'Overdue'
    },
    {
      BorrowID: 'BR004',
      MemberID: 'M004',
      MemberName: 'Emily Davis',
      BookID: 'BC006',
      BookTitle: 'Pride and Prejudice',
      StaffID: 'S003',
      BorrowDate: '2025-11-20',
      DueDate: '2025-12-04',
      ReturnDate: null,
      Status: 'Active'
    },
    {
      BorrowID: 'BR005',
      MemberID: 'M001',
      MemberName: 'John Smith',
      BookID: 'BC001',
      BookTitle: 'The Great Gatsby',
      StaffID: 'S001',
      BorrowDate: '2025-10-15',
      DueDate: '2025-10-29',
      ReturnDate: '2025-10-28',
      Status: 'Returned'
    },
    {
      BorrowID: 'BR006',
      MemberID: 'M005',
      MemberName: 'David Wilson',
      BookID: 'BC008',
      BookTitle: 'The Catcher in the Rye',
      StaffID: 'S002',
      BorrowDate: '2025-11-08',
      DueDate: '2025-11-22',
      ReturnDate: null,
      Status: 'Overdue'
    },
  ];

  const filteredBorrows = borrows.filter(borrow => {
    const matchesSearch = 
      borrow.MemberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrow.BookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrow.BorrowID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrow.MemberID.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || borrow.Status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Borrowing Management</h1>
          <p className="text-gray-600">Track and manage book borrowing records</p>
        </div>
        <button
          onClick={() => onNavigate('borrow-create')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Borrow
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by member, book, or borrow ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-gray-600">Total Borrows</div>
          <div className="text-2xl text-blue-700 mt-1">{borrows.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="text-sm text-gray-600">Active</div>
          <div className="text-2xl text-green-700 mt-1">
            {borrows.filter(b => b.Status === 'Active').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <div className="text-sm text-gray-600">Overdue</div>
          <div className="text-2xl text-red-700 mt-1">
            {borrows.filter(b => b.Status === 'Overdue').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Returned</div>
          <div className="text-2xl text-gray-700 mt-1">
            {borrows.filter(b => b.Status === 'Returned').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Borrow ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Book</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Borrow Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Return Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBorrows.map((borrow) => (
                <tr key={borrow.BorrowID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{borrow.BorrowID}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{borrow.MemberName}</div>
                    <div className="text-xs text-gray-500">{borrow.MemberID}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{borrow.BookTitle}</div>
                    <div className="text-xs text-gray-500">{borrow.BookID}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{borrow.BorrowDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{borrow.DueDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {borrow.ReturnDate || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                      borrow.Status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : borrow.Status === 'Overdue'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {borrow.Status === 'Overdue' && <AlertCircle className="w-3 h-3" />}
                      {borrow.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {borrow.Status !== 'Returned' && (
                        <button
                          onClick={() => onNavigate('return-book', borrow)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Return Book"
                        >
                          <RotateCcw className="w-4 h-4 text-blue-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredBorrows.length} of {borrows.length} borrow records
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
