import React, { useState } from 'react';
import { DollarSign, AlertCircle, CheckCircle, Calendar, Search, CreditCard } from 'lucide-react';

interface UserFinesProps {
  user: any;
  onNavigate: (view: string, item?: any) => void;
}

export default function UserFines({ user, onNavigate }: UserFinesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const fines = [
    {
      FineID: 'F001',
      BorrowID: 'BR003',
      BookTitle: 'To Kill a Mockingbird',
      Amount: 15.00,
      DateIssued: '2025-11-18',
      DatePaid: null,
      FineStatus: 'Unpaid',
      Reason: 'Late Return - 15 days overdue'
    },
    {
      FineID: 'F002',
      BorrowID: 'BR007',
      BookTitle: 'The Hobbit',
      Amount: 7.00,
      DateIssued: '2025-07-26',
      DatePaid: '2025-07-28',
      FineStatus: 'Paid',
      Reason: 'Late Return - 7 days overdue'
    },
    {
      FineID: 'F003',
      BorrowID: 'BR005',
      BookTitle: 'The Catcher in the Rye',
      Amount: 0.00,
      DateIssued: '2025-10-03',
      DatePaid: '2025-10-03',
      FineStatus: 'Paid',
      Reason: 'Returned on time (no charge)'
    },
  ];

  const filteredFines = fines.filter(fine =>
    fine.BookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fine.FineID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fine.BorrowID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnpaid = fines
    .filter(f => f.FineStatus === 'Unpaid')
    .reduce((sum, f) => sum + f.Amount, 0);

  const totalPaid = fines
    .filter(f => f.FineStatus === 'Paid')
    .reduce((sum, f) => sum + f.Amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">My Fines</h1>
        <p className="text-gray-600">View and pay your library fines</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Fines</div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl text-gray-900">{fines.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Unpaid Amount</div>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl text-red-700">${totalUnpaid.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Paid Amount</div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl text-green-700">${totalPaid.toFixed(2)}</div>
        </div>
      </div>

      {/* Outstanding Balance Alert */}
      {totalUnpaid > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-red-900 mb-2">Outstanding Balance</h3>
              <p className="text-sm text-red-800 mb-4">
                You have unpaid fines totaling ${totalUnpaid.toFixed(2)}. Please settle your dues to continue borrowing books.
              </p>
              <button
                onClick={() => {
                  const unpaidFine = fines.find(f => f.FineStatus === 'Unpaid');
                  if (unpaidFine) onNavigate('fine-payment', unpaidFine);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search fines by book title or fine ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Fines List */}
      <div className="space-y-4">
        {filteredFines.map((fine) => (
          <div
            key={fine.FineID}
            className={`bg-white rounded-xl border p-6 ${
              fine.FineStatus === 'Unpaid' ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{fine.BookTitle}</h3>
                    <p className="text-sm text-gray-600">{fine.Reason}</p>
                  </div>
                  <span className={`ml-4 px-3 py-1 rounded-full text-xs ${
                    fine.FineStatus === 'Paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {fine.FineStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Fine ID</div>
                    <div className="text-gray-900">{fine.FineID}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Borrow ID</div>
                    <div className="text-gray-900">{fine.BorrowID}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Date Issued</div>
                    <div className="text-gray-900">{fine.DateIssued}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">
                      {fine.FineStatus === 'Paid' ? 'Date Paid' : 'Amount Due'}
                    </div>
                    <div className={fine.FineStatus === 'Unpaid' ? 'text-red-700' : 'text-gray-900'}>
                      {fine.FineStatus === 'Paid' ? fine.DatePaid : `$${fine.Amount.toFixed(2)}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <div className="text-2xl text-gray-900">${fine.Amount.toFixed(2)}</div>
                </div>
                {fine.FineStatus === 'Unpaid' && fine.Amount > 0 && (
                  <button
                    onClick={() => onNavigate('fine-payment', fine)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Pay Fine
                  </button>
                )}
                {fine.FineStatus === 'Paid' && (
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Paid</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFines.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No fines found</h3>
          <p className="text-gray-600">You have no fines at the moment</p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-blue-900 mb-2">Fine Policy</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Late returns are charged at $1.00 per day</li>
          <li>• Damaged books may incur additional charges</li>
          <li>• Lost books require full replacement cost payment</li>
          <li>• Outstanding fines prevent new book borrowing</li>
          <li>• Payment can be made online or at the library desk</li>
        </ul>
      </div>
    </div>
  );
}
