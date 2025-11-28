import React from 'react';
import { Users, Book, AlertCircle, DollarSign, TrendingUp, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: 'Active Members',
      value: '1,248',
      change: '+12%',
      icon: Users,
      color: 'blue',
      description: 'Total active memberships'
    },
    {
      title: 'Books Available',
      value: '3,567',
      change: '+8%',
      icon: Book,
      color: 'green',
      description: 'Available for borrowing'
    },
    {
      title: 'Overdue Books',
      value: '47',
      change: '-5%',
      icon: AlertCircle,
      color: 'red',
      description: 'Requires attention'
    },
    {
      title: 'Unpaid Fines',
      value: '$2,340',
      change: '+3%',
      icon: DollarSign,
      color: 'yellow',
      description: 'Outstanding payments'
    },
  ];

  const recentBorrows = [
    { id: 'BR001', member: 'John Smith', book: 'The Great Gatsby', date: '2025-11-18', dueDate: '2025-12-02', status: 'Active' },
    { id: 'BR002', member: 'Sarah Johnson', book: '1984', date: '2025-11-19', dueDate: '2025-12-03', status: 'Active' },
    { id: 'BR003', member: 'Michael Brown', book: 'To Kill a Mockingbird', date: '2025-11-17', dueDate: '2025-12-01', status: 'Overdue' },
    { id: 'BR004', member: 'Emily Davis', book: 'Pride and Prejudice', date: '2025-11-20', dueDate: '2025-12-04', status: 'Active' },
    { id: 'BR005', member: 'David Wilson', book: 'The Catcher in the Rye', date: '2025-11-15', dueDate: '2025-11-29', status: 'Overdue' },
  ];

  const recentFines = [
    { id: 'F001', member: 'Michael Brown', amount: '$15.00', reason: 'Late Return', status: 'Unpaid', dateIssued: '2025-11-18' },
    { id: 'F002', member: 'David Wilson', amount: '$25.00', reason: 'Late Return', status: 'Unpaid', dateIssued: '2025-11-17' },
    { id: 'F003', member: 'Lisa Anderson', amount: '$10.00', reason: 'Late Return', status: 'Paid', dateIssued: '2025-11-16' },
    { id: 'F004', member: 'James Taylor', amount: '$50.00', reason: 'Book Damage', status: 'Paid', dateIssued: '2025-11-15' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening in your library today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <h2 className="text-gray-900 mt-2">{stat.value}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">{stat.description}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Borrows */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-gray-900">Recent Borrows</h3>
              <p className="text-sm text-gray-600">Latest borrowing activity</p>
            </div>
            <button
              onClick={() => onNavigate('borrows')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBorrows.map((borrow) => (
                <div key={borrow.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="text-gray-900 text-sm">{borrow.member}</div>
                    <div className="text-gray-600 text-sm">{borrow.book}</div>
                    <div className="text-xs text-gray-500 mt-1">Due: {borrow.dueDate}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    borrow.status === 'Active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {borrow.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Fines */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-gray-900">Recent Fines</h3>
              <p className="text-sm text-gray-600">Latest fine activity</p>
            </div>
            <button
              onClick={() => onNavigate('fines')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentFines.map((fine) => (
                <div key={fine.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="text-gray-900 text-sm">{fine.member}</div>
                    <div className="text-gray-600 text-sm">{fine.reason}</div>
                    <div className="text-xs text-gray-500 mt-1">Issued: {fine.dateIssued}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 text-sm">{fine.amount}</div>
                    <span className={`px-3 py-1 rounded-full text-xs inline-block mt-1 ${
                      fine.status === 'Paid' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {fine.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('borrow-create')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-900">New Borrow</div>
          </button>
          <button
            onClick={() => onNavigate('member-create')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-900">Add Member</div>
          </button>
          <button
            onClick={() => onNavigate('book-create')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Book className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-900">Add Book</div>
          </button>
          <button
            onClick={() => onNavigate('fine-create')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-900">Issue Fine</div>
          </button>
        </div>
      </div>
    </div>
  );
}
