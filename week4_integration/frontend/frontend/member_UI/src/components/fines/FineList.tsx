import React, { useState } from 'react';
import { Plus, Search, DollarSign, Filter, CheckCircle } from 'lucide-react';

interface FineListProps {
  onNavigate: (view: string, item?: any) => void;
}

export default function FineList({ onNavigate }: FineListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fines = [
    {
      FineID: 'F001',
      BorrowID: 'BR003',
      MemberID: 'M003',
      MemberName: 'Michael Brown',
      StaffID: 'S001',
      Amount: 15.00,
      DateIssued: '2025-11-18',
      DatePaid: null,
      FineStatus: 'Unpaid',
      Reason: 'Late Return - 15 days overdue'
    },
    {
      FineID: 'F002',
      BorrowID: 'BR006',
      MemberID: 'M005',
      MemberName: 'David Wilson',
      StaffID: 'S002',
      Amount: 25.00,
      DateIssued: '2025-11-17',
      DatePaid: null,
      FineStatus: 'Unpaid',
      Reason: 'Late Return - 25 days overdue'
    },
    {
      FineID: 'F003',
      BorrowID: 'BR001',
      MemberID: 'M001',
      MemberName: 'John Smith',
      StaffID: 'S001',
      Amount: 10.00,
      DateIssued: '2025-11-16',
      DatePaid: '2025-11-17',
      FineStatus: 'Paid',
      Reason: 'Late Return - 10 days overdue'
    },
    {
      FineID: 'F004',
      BorrowID: 'BR002',
      MemberID: 'M002',
      MemberName: 'Sarah Johnson',
      StaffID: 'S003',
      Amount: 50.00,
      DateIssued: '2025-11-15',
      DatePaid: '2025-11-16',
      FineStatus: 'Paid',
      Reason: 'Book Damage - Water damage to cover'
    },
    {
      FineID: 'F005',
      BorrowID: 'BR004',
      MemberID: 'M004',
      MemberName: 'Emily Davis',
      StaffID: 'S002',
      Amount: 5.00,
      DateIssued: '2025-11-14',
      DatePaid: null,
      FineStatus: 'Unpaid',
      Reason: 'Late Return - 5 days overdue'
    },
    {
      FineID: 'F006',
      BorrowID: 'BR005',
      MemberID: 'M001',
      MemberName: 'John Smith',
      StaffID: 'S001',
      Amount: 100.00,
      DateIssued: '2025-10-20',
      DatePaid: '2025-10-22',
      FineStatus: 'Paid',
      Reason: 'Lost Book - Replacement cost'
    },
  ];

  const filteredFines = fines.filter(fine => {
    const matchesSearch = 
      fine.MemberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.FineID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.BorrowID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.MemberID.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || fine.FineStatus.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const totalUnpaid = fines
    .filter(f => f.FineStatus === 'Unpaid')
    .reduce((sum, f) => sum + f.Amount, 0);

  const totalPaid = fines
    .filter(f => f.FineStatus === 'Paid')
    .reduce((sum, f) => sum + f.Amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Fine Management</h1>
          <p className="text-gray-600">Track and manage library fines and payments</p>
        </div>
        <button
          onClick={() => onNavigate('fine-create')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Issue Fine
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by member, fine ID, or borrow ID..."
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
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Total Fines</div>
          <div className="text-2xl text-gray-900 mt-1">{fines.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <div className="text-sm text-gray-600">Unpaid Amount</div>
          <div className="text-2xl text-red-700 mt-1">${totalUnpaid.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="text-sm text-gray-600">Paid Amount</div>
          <div className="text-2xl text-green-700 mt-1">${totalPaid.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg border border-yellow-200 p-4">
          <div className="text-sm text-gray-600">Unpaid Fines</div>
          <div className="text-2xl text-yellow-700 mt-1">
            {fines.filter(f => f.FineStatus === 'Unpaid').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Fine ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Borrow ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Date Issued</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Date Paid</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFines.map((fine) => (
                <tr key={fine.FineID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{fine.FineID}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{fine.MemberName}</div>
                    <div className="text-xs text-gray-500">{fine.MemberID}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fine.BorrowID}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fine.Reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${fine.Amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fine.DateIssued}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {fine.DatePaid || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      fine.FineStatus === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {fine.FineStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {fine.FineStatus === 'Unpaid' && (
                        <button
                          onClick={() => onNavigate('fine-payment', fine)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Record Payment"
                        >
                          <DollarSign className="w-4 h-4 text-green-600" />
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
            Showing {filteredFines.length} of {fines.length} fines
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
